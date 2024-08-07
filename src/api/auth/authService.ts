import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import type { LoginUserDto, LoginUserResponseDto, RegisterUserDto } from "./authModel";
import { UserRepository } from "../user/userRepository";
import type { User } from "../user/userModel";
import jwt from "jsonwebtoken";
import { env } from "@/common/utils/envConfig";

export class AuthService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  async register(payload: RegisterUserDto) {
    try {
      const userExists = await this.userRepository.findByEmail(payload.email);
      if (userExists) {
        return ServiceResponse.failure("User exists", null, StatusCodes.BAD_REQUEST);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(payload.password, salt);

      const user = await this.userRepository.create({ ...payload, password: hashedPassword });

      return ServiceResponse.success<User>("User registered successfully", user);
    } catch (ex) {
      const errorMessage = `Error registering new user: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occured while registering user",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(payload: LoginUserDto) {
    try {
      const user = await this.userRepository.findByEmail(payload.email);
      if (!user) {
        return ServiceResponse.failure("User account not found", null, StatusCodes.BAD_REQUEST);
      }

      const isMatch = await bcrypt.compare(payload.password, user.password);
      if (!isMatch) {
        return ServiceResponse.failure("Incorrect password", null, StatusCodes.BAD_REQUEST);
      }

      const tokens = {
        accessToken: jwt.sign({ email: user.email, userId: user._id }, env.JWT_SECRET, { expiresIn: "24h" }),
        refreshToken: jwt.sign({ email: user.email, userId: user._id }, env.JWT_SECRET, { expiresIn: "30d" }),
      };

      return ServiceResponse.success<LoginUserResponseDto>("User logged successfully", { tokens, user });
    } catch (ex) {
      const errorMessage = `Error during user login: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occured during user login", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const authService = new AuthService();
