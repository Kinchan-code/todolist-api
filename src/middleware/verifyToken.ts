import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/helper";

dotenv.config();

interface CustomRequest extends Request {
  userId?: string;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;
  if (!token) {
    res
      .status(401)
      .json({ status: "failed", message: "Unauthorized - no token provided" });
    return;
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload;

    if (!decoded) {
      res
        .status(401)
        .json({ status: "failed", message: "Unauthorized - invalid token" });
      return;
    }
    (req as CustomRequest).userId = decoded.userId;
    next();
  } catch (error) {
    next(new CustomError(401, "Unauthorized"));
  }
};
