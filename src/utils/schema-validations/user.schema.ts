import { z } from "zod";

export const EmailBody = z.object({
  email: z
    .string()
    .email()
    .refine((val) => val.trim() !== "", { message: "Email is required" }),
});

export type EmailBodyType = z.TypeOf<typeof EmailBody>;

export const FirstNameBody = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name is 2 characters or more in length")
    .max(256),
});

export type FirstNameBodyType = z.TypeOf<typeof FirstNameBody>;

export const LastNameBody = z.object({
  lastName: z
    .string()
    .trim()
    .min(2, "Last name is 2 characters or more in length")
    .max(256),
});

export type LastNameBodyType = z.TypeOf<typeof LastNameBody>;

export const LessorInfoBody = z.object({
  WareHouseAddress: z
    .string()
    .min(2, "Address is 2 characters or more in length"),
  ShopName: z.string().min(2, "Shop name is 2 characters or more in length"),
});

export type LessorInfoBodyType = z.TypeOf<typeof LessorInfoBody>;
