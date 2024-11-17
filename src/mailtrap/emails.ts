import { mailtrapClient, sender } from "./mailtrap.config";
import dotenv from "dotenv";
import CustomError from "../utils/helper";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates";

dotenv.config(); // Load environment variables

// Send a verification email
export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const recipient = [{ email }]; // Define the recipient

  try {
    const response = await mailtrapClient.send({
      from: sender, // Define the sender
      to: recipient, // Define the recipient
      subject: "Verify your email", // Define the subject
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ), // Replace the verification code in the template
      category: "EmailVerification", // Define the category
    });

    console.log("Email sent successfully", response); // Log a success message
  } catch (error) {
    console.error("Error sending verification email", error); // Log an error if there is an error
    throw new CustomError(500, "Error sending verification email"); // Return an error if there is an error
  }
};

// Send a welcome email
export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipient = [{ email }]; // Define the recipient

  try {
    const response = await mailtrapClient.send({
      from: sender, // Define the sender
      to: recipient, // Define the recipient
      template_uuid: process.env.TEMPLATE_UUID as string, // Define the template UUID
      template_variables: {
        company_info_name: "Auth Company", // Define the company name
        name: name, // Define the name
      },
    });

    console.log("Welcome email sent successfully", response); // Log a success message
  } catch (error) {
    throw new CustomError(500, "Error sending welcome email"); // Return an error if there is an error
  }
};

// Send a reset password email
export const sendResetPasswordEmail = async (
  email: string,
  resetPasswordLink: string
) => {
  const recipient = [{ email }]; // Define the recipient
  try {
    const response = await mailtrapClient.send({
      from: sender, // Define the sender
      to: recipient, // Define the recipient
      subject: "Reset your password", // Define the subject
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
        "{resetURL}",
        resetPasswordLink
      ), // Define the template and replace the reset password link in the template
      category: "Password Reset", // Define the category
    });

    console.log("Reset password email sent successfully", response); // Log a success message
  } catch (error) {
    throw new CustomError(500, "Error sending reset password email"); // Return an error if there is an error
  }
};

// Send a password reset success email
export const sendPasswordResetSuccessEmail = async (email: string) => {
  const recipient = [{ email }]; // Define the recipient
  try {
    const response = await mailtrapClient.send({
      from: sender, // Define the sender
      to: recipient, // Define the recipient
      subject: "Password reset successful", // Define the subject
      html: PASSWORD_RESET_SUCCESS_TEMPLATE, // Define the template
      category: "Password Reset", // Define the category
    });

    console.log("Password reset success email sent successfully", response); // Log a success message
  } catch (error) {
    throw new CustomError(500, "Error sending password reset success email"); // Return an error if there is an error
  }
};
