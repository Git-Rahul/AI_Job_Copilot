import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  professionalSummary: z.string().optional(),
});

export type ProfileInput = z.infer<typeof ProfileSchema>;