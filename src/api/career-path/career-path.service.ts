import { ServiceResponse } from "../../common/models/serviceResponse";
import { logger } from "../../server";
import { StatusCodes } from "http-status-codes";
import { UserRepository } from "../user/userRepository";
import { recommendations } from "./data";
import CareerPath from "./careerSchema";

class CareerPathService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  async create(id: string, body: any) {
    try {
      const user = await this.userRepository.findById(id);

      const recommendedCareerPath = this.generateRecommendations(body);

      const careerField = await CareerPath.create({
        user: user?._id,
        questions: body,
      });

      await this.userRepository.update(user?._id as string, {
        recommendedCareerPath,
      });

      return ServiceResponse.success("Career path submitted successfully", {
        recommendedCareerPath,
      });
    } catch (ex) {
      const errorMessage = `Error during user login: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occured during user login",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  cleanAnswer(answer: string | string[]) {
    if (Array.isArray(answer)) {
      return answer
        .join("")
        .split(" ")
        .map((a) => a.trim());
    }
    return answer.trim();
  }

  generateRecommendations(survey: any) {
    let scores: Record<string, any> = {};

    for (const [career, criteria] of Object.entries(recommendations)) {
      let score = 0;

      survey.forEach((question: any) => {
        const answer = this.cleanAnswer(question.answer);

        switch (question.category) {
          case "Interests and Passions":
            score += criteria.interests.some((i) => answer.includes(i)) ? 1 : 0;
            break;
          case "Skills and Strengths":
            score += criteria.skills.some((s) => answer.includes(s)) ? 1 : 0;
            break;
          case "Career Goals":
            score += criteria.goals.some((g) => answer.includes(g)) ? 1 : 0;
            break;
          case "Learning Style":
            score += criteria.learningStyle.some((ls) => answer.includes(ls))
              ? 1
              : 0;
            break;
        }
      });

      scores[career] = score;
    }

    const sortedRecommendations = Object.entries(scores).sort(
      (a, b) => b[1] - a[1]
    );

    return sortedRecommendations[0][0];
  }
}

export const careerPathService = new CareerPathService();
