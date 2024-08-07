import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";
import { UserRepository } from "../user/userRepository";
import type { User } from "../user/userModel";
import { USER_ROLES, userModel } from "../user/userSchema";

export class MentorService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  async getMentorById(id: string) {
    try {
      const mentor = await this.userRepository.findMentor(id);
      if (!mentor) {
        return ServiceResponse.failure("Mentor not found", null, StatusCodes.NOT_FOUND);
      }

      return ServiceResponse.success<User>("Mentor fetched successfully", mentor);
    } catch (ex) {
      const errorMessage = `Error fetching mentor : ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occured fetching mentor", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async getMentors(page = 1, limit = 15, query = "") {
    try {
      const filter: Record<string, any> = {
        role: USER_ROLES.MENTOR,
      };
      if (query) {
        filter.name = { $regex: new RegExp(query, "gi") };
      }
      const mentors = await userModel.paginate(filter, { page, limit, sort: { createdAt: -1 } });

      return ServiceResponse.success("Mentors fetched successfully", mentors);
    } catch (ex) {
      const errorMessage = `Error fetching mentor : ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occured fetching mentor", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const mentorService = new MentorService();
