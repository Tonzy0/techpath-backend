import { StatusCodes } from "http-status-codes";

import type { UpdatUserProfileDto, User } from "@/api/user/userModel";
import { UserRepository } from "@/api/user/userRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class UserService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  async updateProfile(id: string, payload: UpdatUserProfileDto) {
    try {
      const user = await this.userRepository.update(id, payload);
      if (!user) {
        return ServiceResponse.failure("User account doesn't exist", null, StatusCodes.BAD_REQUEST);
      }

      return ServiceResponse.success("User profile updated successfully", user);
    } catch (ex) {
      const errorMessage = `Error finding all users: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving users.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const userService = new UserService();
