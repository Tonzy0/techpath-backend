import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";

import { openAPIRouter } from "./api-docs/openAPIRouter";
import { healthCheckRouter } from "./api/healthCheck/healthCheckRouter";
import { userRouter } from "./api/user/userRouter";
import errorHandler from "./common/middleware/errorHandler";
import rateLimiter from "./common/middleware/rateLimiter";
import requestLogger from "./common/middleware/requestLogger";
import { authRouter } from "./api/auth/authRouter";
import { mentorRouter } from "./api/mentor/mentorRouter";
import morgan from "morgan";
import { careerPathRouter } from "./api/career-path/careerRouter";

const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));
app.use(helmet());
app.use(morgan("tiny"));
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use("/health-check", healthCheckRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/mentors", mentorRouter);
app.use("/career-path", careerPathRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
