import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { query, type Router } from "express";
import { z } from "zod";

import { mentorController } from "./mentorController";
import { validateRequest } from "@/common/utils/httpHandlers";
import { commonValidations } from "@/common/utils/commonValidation";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { UserSchema } from "../user/userModel";
import { FetchMentorsQuerySchema, PaginatedMentorResponse } from "./mentorModel";

export const mentorRegistry = new OpenAPIRegistry();
export const mentorRouter: Router = express.Router();

const bearerAuth = mentorRegistry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

mentorRegistry.registerPath({
  method: "get",
  path: "/mentor/{id}",
  tags: ["Mentor"],
  request: {
    params: z.object({ id: commonValidations.id }),
  },
  responses: createApiResponse(UserSchema, "Success"),
  security: [{ [bearerAuth.name]: [] }],
});

mentorRouter.get(
  "/:id",
  validateRequest(z.object({ params: z.object({ id: commonValidations.id }) })),
  mentorController.getMentor,
);

mentorRegistry.registerPath({
  method: "get",
  path: "/mentor",
  tags: ["Mentor"],
  request: {
    query: FetchMentorsQuerySchema,
  },
  responses: createApiResponse(PaginatedMentorResponse, "Success"),
  security: [{ [bearerAuth.name]: [] }],
});

mentorRouter.get("/", mentorController.getMentors);
