import mongoose from "mongoose";
import { logger } from "../middleware/logger";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    logger.info("Connected to MongoDB!");
  } catch (err) {
    logger.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit process with failure
  }
};
