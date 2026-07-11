import { z } from "zod";

export const listRankedSongSchema = z.object({
  page: z.coerce
    .number({
      error: "Page is required",
    })
    .int({
      error: "Page must be an integer",
    })
    .min(1, { error: "A page precisa" })
    .default(1),
  limit: z.coerce
    .number({ error: "Limit is required" })
    .int({ error: "Limit must be an integer" })
    .min(1, { error: "Limit must be at least 1" })
    .max(100, { error: "Limit must be at most 100" })
    .default(20),
  sort: z
    .enum(["theme", "createdAt"], {
      error: "Sort must be one of: theme, createdAt",
    })
    .default("createdAt"),

  order: z
    .enum(["asc", "desc"], { error: "Order must be 'asc' or 'desc'" })
    .default("desc"),
});

export type ListRankedSongRequest = z.infer<typeof listRankedSongSchema>;
