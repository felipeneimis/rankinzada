import {z} from "zod";

export const createUserSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(6).max(20)
})

export type createUserRequest = z.infer<typeof createUserSchema>;