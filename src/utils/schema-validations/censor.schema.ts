import { z } from "zod";

export const censorReviewProductBody = z
  .object({
    reason: z.string().min(1, { message: "Please fill reason" }),
  })
  .strict();

export type censorReviewProductBodyType = z.infer<
  typeof censorReviewProductBody
>;
