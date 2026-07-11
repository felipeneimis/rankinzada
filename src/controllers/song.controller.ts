import { NextFunction, Request, Response } from "express";
import songService from "../services/song.service";
import { createSongSchema } from "../dto/request/rankedSong/create-rankedsongs.request";
import { listRankedSongSchema } from "../dto/request/rankedSong/list-rankedsongs.request";

export default {
  async addSong(req: Request, res: Response, next: NextFunction) {
    try {
      const rankedSong = createSongSchema.parse(req.body);
      const created = await songService.addSong(rankedSong);
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  },
  async updateSong(req: Request, res: Response, next: NextFunction) {},
  async deleteSong(req: Request, res: Response, next: NextFunction) {},
  async listSong(req: Request, res: Response, next: NextFunction) {
    try {
      const filter = listRankedSongSchema.parse(req.query);
      console.log(filter);
      const listed = await songService.findMany(filter);
      res.json(listed);
    } catch (error) {
      next(error);
    }
  },
  async findSong(req: Request, res: Response, next: NextFunction) {},
};
