import { z } from "zod";
import { RankinzadaStatus } from "../../../generated/prisma/enums";

export const updateRankinzadaRequestSchema = z.object({
  description: z.string().optional(),
  theme: z.string().optional(),
  rankinzadaStatus: z.enum(RankinzadaStatus).optional(),
});

export type UpdateRankinzadaRequest = z.infer<
  typeof updateRankinzadaRequestSchema
>;
