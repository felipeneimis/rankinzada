import { z } from "zod";
import { SongType } from "../../../../generated/prisma/enums";

export const createSongSchema = z.object({
  title: z.string({
    error: "Title is required",
  }),
  artist: z.string({
    error: "Artist is required",
  }),
  anime: z.string({
    error: "Anime is required",
  }),
  videoUrl: z.url({
    error: "Video URL must be a valid URL",
  }),
  type: z.enum(SongType, {
    error: "Type is required",
  }),
  rankinzadaId: z.number().int().positive({
    error: "Rankinzada ID must be a positive integer",
  }),
  suggestedBy: z.number().int().positive({
    error: "Suggested by must be a positive integer",
  }),
});

export type CreateSongRequest = z.infer<typeof createSongSchema>;
