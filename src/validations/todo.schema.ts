import { z } from "zod";

// Todo Schema
export const todoSchema = z.object({
  item: z.string().min(1), // Item must be at least 1 character long
  completed: z.boolean().optional(), // Completed is optional and must be a boolean
  priority: z.enum(["low", "medium", "high"]).optional(), // Priority is optional and must be low, medium, or high
});
