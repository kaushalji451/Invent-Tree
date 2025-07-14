import { z } from "zod";

export const signupSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  username: z.string().min(1, "Username is required"),
});
