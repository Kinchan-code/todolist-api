import CustomError from "../utils/helper";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates";
import { mailtrapClient, sender } from "./mailtrap.config";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "EmailVerification",
    });

    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending verification email", error);
    throw new CustomError(500, "Error sending verification email");
  }
};
