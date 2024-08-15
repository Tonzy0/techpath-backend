import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "../../common/utils/commonValidation";

extendZodWithOpenApi(z);

const Survery = z.object({
  questionId: z.string().min(1, "Question ID is required"),
  category: z.string().min(1, "Category is required"),
  text: z.string().min(1, "Question text is required"),
  options: z.array(z.string()).nullable(),
  responseType: z.enum(["multiple_choice", "text"]),
  answer: z.union([z.string(), z.array(z.string())]),
});

export const SubmitCareerPathSurveySchema = z.object({
  survey: z.array(Survery),
});

export type SubmitCareerPathSurveryDto = z.TypeOf<
  typeof SubmitCareerPathSurveySchema
>;
