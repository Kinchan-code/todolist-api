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

interface CustomRequest extends Request {
  userId?: string;
}

export const checkAuthController: ControllerType = async (req, res, next) => {
  try {
    const user = await checkAuthService(
      (req as CustomRequest).userId as string
    );
    if (!user) {
      res.status(404).json({ status: "failed", message: "User not found" });
      return;
    }
    res.status(200).json({
      status: "success",
      message: "User is authenticated",
      user,
    });
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};

export const signupController: ControllerType = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
      return;
    }
    const userAlreadyExists = await checkUserExists(email);
    if (userAlreadyExists) {
      res
        .status(400)
        .json({ status: "failed", message: "User already exists" });
      return;
    }

    const user = await signupService(email, password, name);

    generateTokenAndSetCookie(res, user._id.toString());

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: { user: { ...user.toObject(), password: undefined } },
    });
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};

export const verifyEmailController: ControllerType = async (req, res, next) => {
  const { code } = req.body;
  try {
    const user = await verifyEmailService(code);

    res.status(200).json({
      status: "success",
      message: "Email verified successfully",
      data: { user: { ...user.toObject(), password: undefined } },
    });
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};

export const loginController: ControllerType = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res
        .status(400)
        .json({ status: "failed", message: "Invalid credentials" });
      return;
    }

    const user = await loginService(email, password);
    generateTokenAndSetCookie(res, user._id.toString());

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: { user: { ...user.toObject(), password: undefined } },
    });
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};

export const logoutController: ControllerType = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      status: "success",
      message: "User logged out successfully",
    });
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};

export const forgotPasswordController: ControllerType = async (
  req,
  res,
  next
) => {
  const { email } = req.body;
  try {
    await forgotPasswordService(email);

    res.status(200).json({
      status: "success",
      message: "Reset password email sent successfully",
    });
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};

export const resetPasswordController: ControllerType = async (
  req,
  res,
  next
) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    await resetPasswordService(token, password);

    res.status(200).json({
      status: "success",
      message: "Password reset successfully",
    });
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};
