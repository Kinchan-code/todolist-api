import argon2 from "argon2";
import crypto from "crypto";
import { User } from "../models/user.model";
import CustomError from "../utils/helper";
import {
  sendPasswordResetSuccessEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails";

export const checkUserExists = async (email: string) => {
  return await User.findOne({ email });
};

export const checkAuthService = async (userId: string) => {
  return await User.findById(userId).select("-password");
};

export const signupService = async (
  email: string,
  password: string,
  name: string
) => {
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
  await sendVerificationEmail(user.email, verificationToken);

  return user;
};

export const verifyEmailService = async (code: string) => {
  const user = await User.findOne({
    verificationToken: code,
    verificationTokenExpiresAt: { $gt: Date.now() },
  });

  if (!user) {
    throw new CustomError(400, "Invalid or expired verification code");
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiresAt = undefined;

  await user.save();
  await sendWelcomeEmail(user.email, user.name);

  return user;
};

export const loginService = async (email: string, password: string) => {
  const user = await checkUserExists(email);

  if (!user) {
    throw new CustomError(400, "Invalid email");
  }

  const isPasswordCorrect = await argon2.verify(user.password, password);

  if (!isPasswordCorrect) {
    throw new CustomError(400, "Invalid password");
  }

  user.lastLogin = new Date();
  await user.save();

  return user;
};

export const forgotPasswordService = async (email: string) => {
  const user = await checkUserExists(email);
  if (!user) {
    throw new CustomError(400, "Email not found");
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

  user.resetPasswordToken = resetToken;
  user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

  await user.save();

  // Send reset password email
  await sendResetPasswordEmail(
    user.email,
    `${process.env.APP_URL}/api/auth/reset-password/${resetToken}`
  );

  return user;
};

export const resetPasswordService = async (token: string, password: string) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExpiresAt: { $gt: Date.now() },
  });

  if (!user) {
    throw new CustomError(400, "Invalid or expired token");
  }

  // Update password
  user.password = await argon2.hash(password);
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpiresAt = undefined;

  await user.save();

  // Send password reset success email
  await sendPasswordResetSuccessEmail(user.email);

  return user;
};
