import { z } from "zod";
import { RankinzadaStatus } from "../../../generated/prisma/enums";


export const createRankinzadaSchema = z.object({
    description: z.string().min(10).max(200),
    theme: z.string().min(5).max(100),
    rankinzadaStatus: z.string()
        .transform((val) => val.toUpperCase())
        .pipe(z.enum(RankinzadaStatus))
        .default("SUGGESTION"),
    creatorId: z.number()
})

export type CreateRankinzadaRequest = z.infer<typeof createRankinzadaSchema>;