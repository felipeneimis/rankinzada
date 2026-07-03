import { z } from "zod";
import { RankinzadaStatus } from "../../../generated/prisma/enums";


export const findRankinzadaByIdRankinzadaSchema = z.object({
    id: z.coerce.number({})
})

export type FindRankinzadaByIdRequest = z.infer<typeof findRankinzadaByIdRankinzadaSchema>;