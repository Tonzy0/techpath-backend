import { Schema, model, type Document } from "mongoose";

export interface ICareerPath extends Document {
  user: Schema.Types.ObjectId;
  questions: {
    questionId: string;
    category: string;
    text: string;
    options?: string[];
    responseType: string;
    answer: string | string[];
  }[];
}

const CareerPathSchema = new Schema<ICareerPath>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questions: [
      {
        questionId: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        options: {
          type: [String],
          required: false,
        },
        responseType: {
          type: String,
          enum: ["multiple_choice", "text"],
          required: true,
        },
        answer: {
          type: Schema.Types.Mixed,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CareerPath = model<ICareerPath>("CareerPath", CareerPathSchema);

export default CareerPath;
