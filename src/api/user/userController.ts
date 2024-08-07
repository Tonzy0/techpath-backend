import type { Response } from "express";

import { userService } from "../user/userService";
import { handleServiceResponse } from "../../common/utils/httpHandlers";
import type { AuthenticatedRequest } from "../../common/types";
import type { User } from "./userModel";

class UserController {
  public updateProfile = async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user as User;
    const serviceResponse = await userService.updateProfile(user._id, req.body);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const userController = new UserController();
