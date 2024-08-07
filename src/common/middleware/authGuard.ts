import jwt from "jsonwebtoken";

import type { NextFunction, Response } from "express";
import type { AuthenticatedRequest } from "../types";
import { env } from "../utils/envConfig";
import { UserRepository } from "../../api/user/userRepository";

const userRepository = new UserRepository();

export const authGuard = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);

    const user = await userRepository.findByEmail((decoded as any).email);

    if (!user) {
      return res.status(401).json({ message: "Authorized" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
