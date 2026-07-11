import { NextFunction, Request, Response } from "express";
import songService from "../services/song.service";
import { createSongSchema } from "../dto/request/rankedSong/create-rankedsongs.request";

export default {
  async addSong(req: Request, res: Response, next: NextFunction) {
    try {
      const rankedSong = createSongSchema.parse(req.body);
      const created = await songService.addSong(rankedSong);
      res.json(created);
    } catch (error) {
      next(error);
    }
  },
  async updateSong(req: Request, res: Response, next: NextFunction) {},
  async deleteSong(req: Request, res: Response, next: NextFunction) {},
  async listSong(req: Request, res: Response, next: NextFunction) {},
  async findSong(req: Request, res: Response, next: NextFunction) {},
};
