import mongoose from "mongoose";
import { logger } from "../middleware/logger";

// Connect to MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string); // Connect to MongoDB
    logger.info("Connected to MongoDB!"); // Log a success message
  } catch (err) {
    logger.error("Failed to connect to MongoDB", err); // Log an error if the connection fails
    process.exit(1); // Exit process with failure
  }
};
