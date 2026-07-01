import {z} from "zod";
import { RankinzadaStatus } from "../../../generated/prisma/enums";

//TODO: Remover o title e manter apenas theme

export const createRankinzadaSchema = z.object({
    title: z.string().min(6).max(100),
    description: z.string().min(10).max(200),
    theme: z.string().min(5).max(100),
    rankinzadaStatus: z.string().transform((val) => val.toUpperCase())
    .pipe(z.enum(RankinzadaStatus)),
    creatorId: z.number()
})

export type CreateRankinzadaRequest = z.infer<typeof createRankinzadaSchema>;