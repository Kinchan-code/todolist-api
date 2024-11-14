import CustomError from "../utils/helper";
import { ControllerType } from "../types/types";
import argon2 from "argon2";
import { User } from "../models/user.model";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie";
import { sendVerificationEmail } from "../mailtrap/emails";

export const signupController: ControllerType = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new CustomError(400, "All fields are required");
    }
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      res
        .status(400)
        .json({ status: "failed", message: "User already exists" });
    }

    const hashedPassword = await argon2.hash(password);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    await user.save();

    generateTokenAndSetCookie(res, user._id.toString());

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: { user: { ...user.toObject(), password: undefined } },
    });
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};

export const loginController: ControllerType = async (req, res, next) => {
  const { email, password } = req.body;
  try {
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};

export const logoutController: ControllerType = async (req, res, next) => {
  try {
  } catch (error) {
    next(new CustomError(500, (error as Error).message));
  }
};
