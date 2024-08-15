import { validateRequest } from "@/common/utils/httpHandlers";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { careerPathController } from "./careerPathController";
import { SubmitCareerPathSurveySchema } from "./careerPathModel";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { z } from "zod";
import { authGuard } from "@/common/middleware/authGuard";

export const careerPathRegistry = new OpenAPIRegistry();
export const careerPathRouter: Router = express.Router();

careerPathRegistry.registerPath({
  method: "post",
  path: "/career-path/register",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": { schema: SubmitCareerPathSurveySchema },
      },
    },
  },
  responses: createApiResponse(
    z.object({ recommendedCareerPath: z.string() }),
    "Success"
  ),
});

careerPathRouter.post(
  "/",
  [
    validateRequest(z.object({ body: SubmitCareerPathSurveySchema })),
    authGuard,
  ],
  careerPathController.createCatreerPath
);
