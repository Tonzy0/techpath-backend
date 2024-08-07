import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { z } from "zod";

import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { UpdatUserProfileSchema, UserSchema } from "@/api/user/userModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { userController } from "./userController";
import { authGuard } from "@/common/middleware/authGuard";

export const userRegistry = new OpenAPIRegistry();
export const userRouter: Router = express.Router();

userRegistry.register("User", UserSchema);

const bearerAuth = userRegistry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

userRegistry.registerPath({
  method: "patch",
  path: "/users",
  tags: ["User"],
  request: {
    body: {
      content: {
        "application/json": { schema: UpdatUserProfileSchema },
      },
    },
  },
  responses: createApiResponse(UserSchema, "Succecss"),
  security: [{ [bearerAuth.name]: [] }],
});

userRouter.patch(
  "/",
  [validateRequest(z.object({ body: UpdatUserProfileSchema })), authGuard],
  userController.updateProfile,
);

