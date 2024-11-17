import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Mailtrap client
export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN || "", // Define the Mailtrap token
});

// Sender
export const sender = {
  email: "hello@demomailtrap.com", // Define the sender email
  name: "Christian Bangay", // Define the sender name
};
