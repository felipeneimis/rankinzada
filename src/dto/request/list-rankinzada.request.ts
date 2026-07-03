import { z } from "zod";
import { RankinzadaStatus } from "../../../generated/prisma/enums";


export const listRankinzadaSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),

    theme: z.string()
        .min(5, { error: "O tema deve ter pelo menos 5 caracteres" })
        .max(100, { error: "O tema deve ter no máximo 100 caracteres" })
        .trim().optional(),

    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),

    rankinzadaStatus: z.string()
        .transform((val) => val.toUpperCase())
        .pipe(z.enum(RankinzadaStatus, {
            error: "Status inválido."
        }))
        .optional(),

    sort: z.enum(["theme", "createdAt"]).default("createdAt"),

    order: z.enum(["asc", "desc"]).default("desc"),
})

export type ListRankinzadaRequest = z.infer<typeof listRankinzadaSchema>;