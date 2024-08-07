import { z } from "zod";
import { Schema, isValidObjectId } from "mongoose";

export const commonValidations = {
  id: z
    .string()
    .refine((data) => isValidObjectId(data), {
      message: "Invalid ObjectId format",
    })
    .transform((data) => new Schema.Types.ObjectId(data)),
};
