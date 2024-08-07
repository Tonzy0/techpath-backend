import mongoose from "mongoose";
import { pino } from "pino";
import { env } from "@/common/utils/envConfig";

const logger = pino({ name: "database" });

export const connectDatabase = async () => {
  await mongoose.connect(env.MONGO_URI, {});
  logger.info("mongodb database is connected");
};
