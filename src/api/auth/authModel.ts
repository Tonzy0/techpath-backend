import { z } from "zod";
import { UserSchema } from "../user/userModel";

export const RegisterUserSchema = z.object({
  name: z.string(),
  email: z.string().email().toLowerCase(),
  password: z.string(),
  role: z.string().default("user"),
  careerField: z.string().optional(),
  yearOfExperience: z.number().optional(),
  location: z.string().trim().optional(),
  linkedInProfile: z.string().url().trim().optional(),
  portfolioLink: z.string().url().trim().optional(),
  acceptTerms: z.literal(true),
});

export type RegisterUserDto = z.TypeOf<typeof RegisterUserSchema>;

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginUserDto = z.TypeOf<typeof LoginUserSchema>;

export const LoginUserResponse = z.object({
  tokens: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
  user: UserSchema,
});

export type LoginUserResponseDto = z.TypeOf<typeof LoginUserResponse>;
