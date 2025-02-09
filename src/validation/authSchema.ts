import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email tidak valid."),
  password: z.string().min(8, "Password harus minimal 8 karakter."),
});

export const registerSchema = z.object({
  email: z.string().email("Email tidak valid."),
  firstName: z.string().nonempty("Nama depan wajib diisi"),
  lastName: z.string().nonempty("Nama Belakang wajib diisi"),
  password: z.string().min(8, "Password harus minimal 8 karakter."),
  confirmPassword: z.string().min(8)
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "Password harus sama.",
      path: ['confirmPassword']
    });
  }
});