import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import postRoutes from "./routes/post.router.js";
import { logger } from "./middleware/logger.js";
import { errorHandler, handle404 } from "./middleware/error.js";

const app = express();

// Security
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10kb" }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

// logs
app.use(logger);

app.use("/", limiter);

// Routes
app.use("/posts", postRoutes);

// Errors
app.use(handle404);
app.use(errorHandler);

export default app;
