import { z } from "zod";

export const CreateProductBody = z
  .object({
    name: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    value: z.number().min(1, {
      message: "Product purchase is required and must be greater than 0",
    }),
    price: z
      .number()
      .min(1, { message: "Rent is required and must be greater than 0" }),
    policies: z.string().min(1, { message: "Policies is required" }),
    maximumRentDays: z.number().min(1, { message: "Maximum days is required" }),
  })
  .strict();

export type CreateProductBodyType = z.infer<typeof CreateProductBody>;
