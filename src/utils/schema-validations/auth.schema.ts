import { z } from "zod";

export const LoginBody = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100),
  })
  .strict();

export type LoginBodyType = z.infer<typeof LoginBody>;

export const RegisterBody = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name is 2 characters or more in length")
      .max(256),
    lastName: z
      .string()
      .trim()
      .min(2, "Last name is 2 characters or more in length")
      .max(256),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
    phoneNumber: z.string().refine(
      (val) => {
        if (/^0\d{9}$/.test(val)) return true;
        if (/^\d{9}$/.test(val)) return true;
        return false;
      },
      {
        message: "Invalid phone number",
      }
    ),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;
