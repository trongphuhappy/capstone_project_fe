import z from "zod";

export const ForgotPasswordEmailBody = z
  .object({
    email: z.string().email(),
  })
  .strict();

export type ForgotPasswordEmailBodyType = z.TypeOf<
  typeof ForgotPasswordEmailBody
>;

export const ForgotPasswordEmailRes = z.object({
  data: z.object({
    token: z.string(),
    expiresAt: z.string(),
    account: z.object({
      email: z.string(),
    }),
  }),
  message: z.string(),
});

export type ForgotPasswordEmailResType = z.TypeOf<
  typeof ForgotPasswordEmailRes
>;

export const ForgotPasswordChangeBody = z
  .object({
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
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
  })

export type ForgotPasswordChangeBodyType = z.TypeOf<
  typeof ForgotPasswordChangeBody
>;