import { z } from "zod";

/** Shared contact schema — used by both the form (client) and API (server). */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "That name is a little long"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  // Optional: what kind of project / budget
  subject: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more (min 10 characters)")
    .max(4000, "That message is very long"),
  // Honeypot — hidden from humans, must stay empty. Bots fill it in.
  // We accept any value here so the API can silently drop (not 400) on a hit,
  // keeping the trap invisible. The drop logic lives in the route handler.
  company: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
