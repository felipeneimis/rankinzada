import { z } from "zod";
import { RankinzadaStatus } from "../../../generated/prisma/enums";


export const createRankinzadaSchema = z.object({
    description: z.string({
        error: "A descrição é obrigatória"
    })
        .min(10, { error: "A descrição deve ter pelo menos 10 caracteres" })
        .max(200, { error: "A descrição deve ter no máximo 200 caracteres" }),
    theme: z.string({ error: "O tema é obrigatório" })
        .min(5, { error: "O tema deve ter pelo menos 5 caracteres" })
        .max(100, { error: "O tema deve ter no máximo 100 caracteres" }),
    rankinzadaStatus: z.string()
        .transform((val) => val.toUpperCase())
        .pipe(z.enum(RankinzadaStatus,{
             error: "Status inválido."
        }))
        .default("SUGGESTION"),
    creatorId: z.number({ error: "O criador é obrigatório." })
})

export type CreateRankinzadaRequest = z.infer<typeof createRankinzadaSchema>;