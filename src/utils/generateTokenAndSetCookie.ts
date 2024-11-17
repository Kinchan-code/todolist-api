import jwt from "jsonwebtoken";
import { Response } from "express";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Generate token and set cookie
export const generateTokenAndSetCookie = (res: Response, userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d", // Token expires in 7 days
  }); // Generate token

  // Set cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === "production", // Only send the cookie over HTTPS in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token; // Return token
};
