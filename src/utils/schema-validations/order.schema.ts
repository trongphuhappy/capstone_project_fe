import { z } from "zod";

export const checkOrderProductProductBody = z
  .object({
    rejectReason: z.string().min(1, { message: "Please fill reason" }),
  })
  .strict();

export type checkOrderProductProductBodyType = z.infer<
  typeof checkOrderProductProductBody
>;
