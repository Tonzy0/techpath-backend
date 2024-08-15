import { handleServiceResponse } from "../../common/utils/httpHandlers";
import type { AuthenticatedRequest } from "../../common/types";
import type { Response } from "express";
import { careerPathService } from "./career-path.service";

class CareerPathController {
  public createCatreerPath = async (
    req: AuthenticatedRequest,
    res: Response
  ) => {
    const serviceResponse = await careerPathService.create(
      req.user?._id as string,
      req.body.survey
    );
    return handleServiceResponse(serviceResponse, res);
  };
}

export const careerPathController = new CareerPathController();
