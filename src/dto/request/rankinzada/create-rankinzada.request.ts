import { z } from "zod";
import { RankinzadaStatus } from "../../../../generated/prisma/enums";

export const createRankinzadaSchema = z.object({
  description: z
    .string({
      error: "Description is required",
    })
    .min(10, { error: "Description must be at least 10 characters" })
    .max(200, { error: "Description must be at most 200 characters" }),
  theme: z
    .string({ error: "Theme is required" })
    .min(5, { error: "Theme must be at least 5 characters" })
    .max(100, { error: "Theme must be at most 100 characters" }),
  rankinzadaStatus: z
    .string({ error: "Status is required" })
    .transform((val) => val.toUpperCase())
    .pipe(
      z.enum(RankinzadaStatus, {
        error: "Invalid status.",
      }),
    )
    .default("SUGGESTION"),
  creatorId: z.number({ error: "Creator is required." }),
});

export type CreateRankinzadaRequest = z.infer<typeof createRankinzadaSchema>;
