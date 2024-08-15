import { type PaginateModel, Schema, model, type Document } from "mongoose";
import paginate from "mongoose-paginate-v2";

interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  role: string;
  careerField: string;
  yearOfExperience: number;
  location: string;
  linkedInProfile: string;
  portfolioLink: string;
  recommendedCareerPath: string;
  careerPath: Schema.Types.ObjectId;
}

export enum USER_ROLES {
  USER = "user",
  MENTOR = "mentor",
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: USER_ROLES.USER,
      enum: Object.values(USER_ROLES),
    },
    careerField: {
      type: String,
      trim: true,
    },
    yearOfExperience: {
      type: Number,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    linkedInProfile: {
      type: String,
      required: false,
    },
    portfolioLink: {
      type: String,
      required: false,
    },
    recommendedCareerPath: {
      type: String,
      default: "",
    },

    // careerPath
    careerPath: {
      type: Schema.Types.ObjectId,
      ref: "careerpaths",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(paginate);

export const userModel = model<IUser, PaginateModel<IUser>>(
  "users",
  UserSchema
);
