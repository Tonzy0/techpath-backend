import type { RequestHandler, Request, Response } from "express";
import { mentorService } from "./mentorService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";

class MentorController {
  public getMentor: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await mentorService.getMentorById(req.params.id);
    return handleServiceResponse(serviceResponse, res);
  };

  public getMentors: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await mentorService.getMentors(
      Number(req.query.page),
      Number(req.query.limit),
      req.query.query as string,
    );
    return handleServiceResponse(serviceResponse, res);
  };
}

export const mentorController = new MentorController();
