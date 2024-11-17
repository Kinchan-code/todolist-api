import { Request, Response, NextFunction } from "express";

// Controller type
export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>; // returns promise void
