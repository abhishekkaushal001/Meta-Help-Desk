import { z } from "zod";

export const newUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .max(150, "Name exceeds allowed limits."),
  email: z
    .string()
    .email("Enter a valid email.")
    .min(3, "Email is required.")
    .max(255, "Email exceeds allowed limits."),
  password: z.string().min(8, "Minimun 8 characters are required.").max(50),
});

export const userLoginSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email.")
    .min(3, "Email is required.")
    .max(255, "Email exceeds allowed limits."),
  password: z.string().max(50),
});
