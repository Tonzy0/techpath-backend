import { z } from "zod";
import { UserSchema } from "../user/userModel";

export const FetchMentorsQuerySchema = z
  .object({
    page: z.number().int().positive().default(1),
    limit: z.number().int().positive().max(100).default(10),
    query: z.string().trim().optional(),
    careerPath: z.string().trim().optional(),
  })
  .strict();

export const PaginatedMentorResponse = z.object({
  docs: z.array(UserSchema),
  totalDocs: z.number().int().nonnegative(),
  limit: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
  page: z.number().int().positive(),
  pagingCounter: z.number().int().nonnegative(),
  hasPrevPage: z.boolean(),
  hasNextPage: z.boolean(),
  prevPage: z.number().int().nonnegative().nullable(),
  nextPage: z.number().int().nonnegative().nullable(),
});
