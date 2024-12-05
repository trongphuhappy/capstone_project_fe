import { z } from "zod";

export const feedbackProductBody = z
  .object({
    content: z.string().min(1, { message: "Please fill content" }),
  })
  .strict();

export type feedbackProductBodyType = z.infer<
  typeof feedbackProductBody
>;
