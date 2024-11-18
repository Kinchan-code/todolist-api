import { z } from "zod";

// Signup Schema
export const signupSchema = z.object({
  email: z.string().email(), // Email must be a valid email address
  password: z.string().min(8), // Password must be at least 6 characters long
  name: z.string().min(1), // Name must be at least 1 character long
});

// Login Schema
export const loginSchema = z.object({
  email: z.string().email(), // Email must be a valid email address
  password: z.string().min(1), // Password must not be empty
});
