import { z } from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const registerSchema = z.object({
  email: z.string(),
  username: z.string(),
  password: z.string(),
});
