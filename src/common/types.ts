import type { User } from "@/api/user/userModel";
import type { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: User;
}
