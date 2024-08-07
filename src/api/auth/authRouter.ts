import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";

import { UserSchema } from "../user/userModel";
import { authController } from "./authController";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { LoginUserResponse, LoginUserSchema, RegisterUserSchema } from "./authModel";
import { z } from "zod";

export const authRegistry = new OpenAPIRegistry();
export const authRouter: Router = express.Router();

authRegistry.registerPath({
  method: "post",
  path: "/auth/register",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": { schema: RegisterUserSchema },
      },
    },
  },
  responses: createApiResponse(UserSchema, "Success"),
});

authRouter.post("/register", validateRequest(z.object({ body: RegisterUserSchema })), authController.registerUser);

authRegistry.registerPath({
  method: "post",
  path: "/auth/login",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": { schema: LoginUserSchema },
      },
    },
  },
  responses: createApiResponse(LoginUserResponse, "Success"),
});

authRouter.post("/login", validateRequest(z.object({ body: LoginUserSchema })), authController.loginUser);
