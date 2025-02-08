import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid."),
  password: z.string().min(8, "Password harus minimal 8 karakter."),
});

export const registerSchema = z.object({
  email: z.string().email("Email tidak valid."),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(8, "Password harus minimal 8 karakter."),
  confirmPassword: z.string().min(8)
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "Passowrd harus sama.",
      path: ['confirmPassword']
    });
  }
});