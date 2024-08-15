import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "../../common/utils/commonValidation";

extendZodWithOpenApi(z);

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  password: z.string(),
  careerField: z.string(),
  yearOfExperience: z.number().int().positive(),
  location: z.string(),
  linkedInProfile: z.string(),
  portfolioLink: z.string(),
  careerPath: z.string(),
  recommendedCareerPath: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export const UpdatUserProfileSchema = z.object({
  careerField: z.string().optional(),
  yearOfExperience: z.number().int().positive().optional(),
  location: z.string().optional(),
  linkedInProfile: z.string().optional(),
  portfolioLink: z.string().optional(),
  recommendedCareerPath: z.string().optional(),
});

export type UpdatUserProfileDto = z.TypeOf<typeof UpdatUserProfileSchema>;
