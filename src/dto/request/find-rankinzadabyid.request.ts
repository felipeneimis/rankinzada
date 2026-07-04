import { z } from "zod";
import { RankinzadaStatus } from "../../../generated/prisma/enums";

export const findRankinzadaByIdRankinzadaSchema = z.object({
  id: z.coerce
    .number({ error: "Id is required" })
    .int({ error: "Id must be an integer" })
    .min(1, { error: "Id must be at least 1" }),
});

export type FindRankinzadaByIdRequest = z.infer<
  typeof findRankinzadaByIdRankinzadaSchema
>;
