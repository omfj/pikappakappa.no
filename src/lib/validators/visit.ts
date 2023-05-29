import { z } from "zod";

export const visitSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  visiting: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Du må besøke minst en person",
  }),
  reason: z.string(),
});
