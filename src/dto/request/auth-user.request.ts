import { z } from "zod";

export const authUserSchema = z.object({
  username: z
    .string({ error: "Username is required" })
    .min(3, { error: "Username must have at least 3 characters" })
    .max(20, { error: "Username must have at most 20 characters" }),
  password: z
    .string({ error: "Password is required" })
    .min(6, { error: "Password must have at least 6 characters" })
    .max(20, { error: "Password must have at most 20 characters" }),
});

export type AuthUserRequest = z.infer<typeof authUserSchema>;
