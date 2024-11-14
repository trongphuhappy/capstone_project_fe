import { z } from "zod";

export const UpdateProfileBody = z.object({
  id: z.number().int().min(1),
  password: z.string().min(6).max(100).optional(),
  email: z
    .string()
    .email()
    .refine((val) => val.trim() !== "", { message: "Email is required" }),
  avatar: z.string().url().optional(),
  address: z.string().optional(),
  detailedAddress: z.string().optional(),
  dob: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date of birth",
    })
    .optional(),
  phoneNumber: z
    .string()
    .optional()
    .refine((val) => val === undefined || /^\+?\d+$/.test(val), {
      message: "Invalid phone number",
    }),
  fullName: z
    .string()
    .refine((val) => val.trim() !== "", { message: "Full Name is required" }),
  role: z
    .string()
    .refine((val) => val.trim() !== "", { message: "Role is required" })
    .optional(),
  citizenId: z
    .string()
    .refine((val) => val.trim() !== "", { message: "Citizen ID is required" })
    .optional(),
  citizenCardFront: z.string().url().optional(),
  citizenCardBack: z.string().url().optional(),
  updatedAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid updated date",
    })
    .optional(),
});

export type UpdateProfileBodyType = z.TypeOf<typeof UpdateProfileBody>;
