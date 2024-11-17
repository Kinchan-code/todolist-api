import dotenv from "dotenv";
import { Request } from "express";
import CustomError from "../utils/helper";
import { ControllerType } from "../types/types";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie";
import {
  checkUserExists,
  checkAuthService,
  signupService,
  verifyEmailService,
  loginService,
  forgotPasswordService,
  resetPasswordService,
} from "../service/auth.service";

dotenv.config();

// Custom request interface
interface CustomRequest extends Request {
  userId?: string;
}

// Check auth controller
export const checkAuthController: ControllerType = async (req, res, next) => {
  try {
    const user = await checkAuthService(
      (req as CustomRequest).userId as string // Get the user ID from the request
    );
    if (!user) {
      res.status(404).json({ status: "failed", message: "User not found" }); // Return an error if the user is not found
      return;
    }
    res.status(200).json({
      status: "success",
      message: "User is authenticated",
      user,
    }); // Return the user
  } catch (error) {
    next(new CustomError(500, (error as Error).message)); // Return an error if there is an error
  }
};

// Sign up controller
export const signupController: ControllerType = async (req, res, next) => {
  const { email, password, name } = req.body; // Get the email, password, and name from the request
  try {
    if (!email || !password || !name) {
      res
        .status(400)
        .json({ status: "failed", message: "All fields are required" }); // Return an error if any of the fields are missing
      return;
    }
    const userAlreadyExists = await checkUserExists(email); // Check if the user already exists
    if (userAlreadyExists) {
      res
        .status(400)
        .json({ status: "failed", message: "User already exists" }); // Return an error if the user already exists
      return;
    }
    const user = await signupService(email, password, name); // Create a user

    generateTokenAndSetCookie(res, user._id.toString()); // Generate a token and set it in the cookie

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: { user: { ...user.toObject(), password: undefined } },
    });
  } catch (error) {
    next(new CustomError(500, (error as Error).message)); // Return an error if there is an error
  }
};

// Verify email controller
export const verifyEmailController: ControllerType = async (req, res, next) => {
  const { code } = req.body; // Get the code from the request
  try {
    const user = await verifyEmailService(code); // Verify the email

    res.status(200).json({
      status: "success",
      message: "Email verified successfully",
      data: { user: { ...user.toObject(), password: undefined } },
    }); // Return the user
  } catch (error) {
    next(new CustomError(500, (error as Error).message)); // Return an error if there is an error
  }
};

// Login controller
export const loginController: ControllerType = async (req, res, next) => {
  const { email, password } = req.body; // Get the email and password from the request
  try {
    if (!email || !password) {
      res
        .status(400)
        .json({ status: "failed", message: "Invalid credentials" });
      return;
    } // Return an error if the email or password is invalid

    const user = await loginService(email, password); // Login the user
    generateTokenAndSetCookie(res, user._id.toString()); // Generate a token and set it in the cookie

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: { user: { ...user.toObject(), password: undefined } },
    }); // Return the user
  } catch (error) {
    next(new CustomError(500, (error as Error).message)); // Return an error if there is an error
  }
};

// Logout controller
export const logoutController: ControllerType = async (req, res, next) => {
  try {
    res.clearCookie("jwt"); // Clear the cookie
    res.status(200).json({
      status: "success",
      message: "User logged out successfully",
    }); // Return a success message
  } catch (error) {
    next(new CustomError(500, (error as Error).message)); // Return an error if there is an error
  }
};

// Forgot password controller
export const forgotPasswordController: ControllerType = async (
  req,
  res,
  next
) => {
  const { email } = req.body;
  try {
    await forgotPasswordService(email); // Send a reset password email

    res.status(200).json({
      status: "success",
      message: "Reset password email sent successfully",
    }); // Return a success message
  } catch (error) {
    next(new CustomError(500, (error as Error).message)); // Return an error if there is an error
  }
};

// Reset password controller
export const resetPasswordController: ControllerType = async (
  req,
  res,
  next
) => {
  try {
    const { token } = req.params; // Get the token from the request
    const { password } = req.body; // Get the password from the request

    await resetPasswordService(token, password); // Reset the password

    res.status(200).json({
      status: "success",
      message: "Password reset successfully",
    }); // Return a success message
  } catch (error) {
    next(new CustomError(500, (error as Error).message)); // Return an error if there is an error
  }
};
