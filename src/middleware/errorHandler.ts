import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/helper";
import { logger } from "./logger";

type ErrorHandlerType = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const errorHandler: ErrorHandlerType = (err, req, res, next) => {
  // Check if the error is an instance of CustomError
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Log unexpected errors
  logger.error(err);

  // In development, include the stack trace for debugging purposes
  if (process.env.NODE_ENV === "development") {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      stack: err.stack, // Provide stack trace in development for easier debugging
    });
  }

  // For production or other environments, hide the stack trace to avoid exposing sensitive info
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
