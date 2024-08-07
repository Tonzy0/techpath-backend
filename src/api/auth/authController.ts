import type { Request, RequestHandler, Response } from "express";
import { authService } from "./authService";
import { handleServiceResponse } from "../../common/utils/httpHandlers";

class AuthController {
  public registerUser: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await authService.register(req.body);
    return handleServiceResponse(serviceResponse, res);
  };

  public loginUser: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await authService.login(req.body);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const authController = new AuthController();
