import { z } from "zod";

export const LoginBody = z
  .object({
    userName: z.string().refine((val) => val.trim() !== "", {
      message: "Username is required",
    }),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100),
  })
  .strict();

export type LoginBodyType = z.infer<typeof LoginBody>;

export const RegisterBody = z
  .object({
    fullName: z.string().refine((val) => val.trim() !== "", {
      message: "FullName is required",
    }),
    userName: z.string().refine((val) => val.trim() !== "", {
      message: "Username is required",
    }),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    passwordConfirm: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["passwordConfirm"],
      });
    }
  });

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;
