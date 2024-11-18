import argon2 from "argon2";
// import crypto from "crypto";
import CustomError from "../utils/helper";
import { User } from "../models/user.model";
import { loginSchema, signupSchema } from "../validations/auth.schema";
// import {
//   sendPasswordResetSuccessEmail,
//   sendResetPasswordEmail,
//   sendVerificationEmail,
//   sendWelcomeEmail,
// } from "../mailtrap/emails";

// Check if the user exists
export const checkUserExists = async (email: string) => {
  return await User.findOne({ email });
};

// Check if the user exists and return the user without the password
export const checkAuthService = async (userId: string) => {
  return await User.findById(userId).select("-password");
};

// Sign up service
export const signupService = async (
  email: string,
  password: string,
  name: string
) => {
  signupSchema.parse({ email, password, name }); // Validate the data
  const hashedPassword = await argon2.hash(password); // Hash the password
  // const verificationToken = Math.floor(
  //   100000 + Math.random() * 900000
  // ).toString(); // Generate a verification token

  const user = await User.create({
    email, // Email
    password: hashedPassword, // Hashed password
    name, // Name
    // verificationToken, // Verification token
    // verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  }); // Create a new user

  await user.save(); // Save the user
  // await sendVerificationEmail(user.email, verificationToken); // Send a verification email

  return user; // Return the user
};

// Verify email service
// export const verifyEmailService = async (code: string) => {
//   const user = await User.findOne({
//     verificationToken: code, // Verification token
//     verificationTokenExpiresAt: { $gt: Date.now() }, // Check if the verification token is expired
//   }); // Find a user with the verification token and check if the verification token is expired

//   if (!user) {
//     throw new CustomError(400, "Invalid or expired verification code"); // Throw an error if the verification token is invalid or expired
//   }

//   user.isVerified = true; // Set the user as verified
//   user.verificationToken = undefined; // Remove the verification token
//   user.verificationTokenExpiresAt = undefined; // Remove the verification token expiration date

//   await user.save(); // Save the user
//   await sendWelcomeEmail(user.email, user.name); // Send a welcome email

//   return user; // Return the user
// };

// Login service
export const loginService = async (email: string, password: string) => {
  loginSchema.parse({ email, password }); // Validate the data
  const user = await checkUserExists(email); // Check if the user exists

  if (!user) {
    throw new CustomError(400, "Invalid email"); // Throw an error if the user does not exist
  }

  const isPasswordCorrect = await argon2.verify(user.password, password); // Verify the password

  if (!isPasswordCorrect) {
    throw new CustomError(400, "Invalid password"); // Throw an error if the password is incorrect
  }

  user.lastLogin = new Date(); // Set the last login date
  await user.save();

  return user; // Return the user
};

export const changePasswordService = async (
  userId: string,
  password: string
) => {
  const user = await User.findById(userId); // Check if the user exists

  if (!user) {
    throw new CustomError(400, "User not found"); // Throw an error if the user does not exist
  }

  // Check if the new password is the same as the current password
  const isSamePassword = await argon2.verify(user.password, password);
  if (isSamePassword) {
    throw new CustomError(
      400,
      "New password cannot be the same as the current password"
    ); // Throw an error if the passwords are the same
  }
  // Update password
  user.password = await argon2.hash(password); // Hash the password

  await user.save(); // Save the user

  return user; // Return the user
};

// Forgot password service
// export const forgotPasswordService = async (email: string) => {
//   const user = await checkUserExists(email); // Check if the user exists
//   if (!user) {
//     throw new CustomError(400, "Email not found"); // Throw an error if the user does not exist
//   }

//   // Generate reset token
//   const resetToken = crypto.randomBytes(20).toString("hex"); // Generate a reset token
//   const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

//   user.resetPasswordToken = resetToken;
//   user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

//   await user.save(); // Save the user

//   // Send reset password email
//   await sendResetPasswordEmail(
//     user.email,
//     `${process.env.APP_URL}/api/auth/reset-password/${resetToken}`
//   ); // Send a reset password email

//   return user; // Return the user
// };

// Reset password service
// export const resetPasswordService = async (token: string, password: string) => {
//   const user = await User.findOne({
//     resetPasswordToken: token, // Reset token
//     resetPasswordTokenExpiresAt: { $gt: Date.now() }, // Check if the reset token is expired
//   }); // Find a user with the reset token and check if the reset token is expired

//   if (!user) {
//     throw new CustomError(400, "Invalid or expired token"); // Throw an error if the reset token is invalid or expired
//   }

//   // Update password
//   user.password = await argon2.hash(password); // Hash the password
//   user.resetPasswordToken = undefined; // Remove the reset token
//   user.resetPasswordTokenExpiresAt = undefined; // Remove the reset token expiration date

//   await user.save(); // Save the user

//   // Send password reset success email
//   await sendPasswordResetSuccessEmail(user.email);

//   return user; // Return the user
// };
