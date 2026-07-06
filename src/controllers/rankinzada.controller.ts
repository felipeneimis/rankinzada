import { NextFunction, Request, Response } from "express";
import rankinzadaService from "../services/rankinzada.service";
import { createRankinzadaSchema } from "../dto/request/create-rankinzada.request";
import { listRankinzadaSchema } from "../dto/request/list-rankinzada.request";
import { findRankinzadaByIdRankinzadaSchema } from "../dto/request/find-rankinzadabyid.request";
import { updateRankinzadaRequestSchema } from "../dto/request/update-rankinzada.request";

// [ ]: Futuramente checar role para poder saber se usuário pode ou não criar rankinzada

export default {
  async createRankinzada(req: Request, res: Response, next: NextFunction) {
    try {
      const rankinzada = createRankinzadaSchema.parse(req.body);
      const created = await rankinzadaService.createRankinzada(rankinzada);
      return res.json(created);
    } catch (error) {
      next(error);
    }
  },
  async listRankinzada(req: Request, res: Response, next: NextFunction) {
    try {
      const query = listRankinzadaSchema.parse(req.query);

      const result = await rankinzadaService.listRankinzada(query);

      return res.json(result);
    } catch (error) {
      next(error);
    }
  },
  async findRankinzadaById(req: Request, res: Response, next: NextFunction) {
    try {
      const params = findRankinzadaByIdRankinzadaSchema.parse(req.params);
      const rankinzada = await rankinzadaService.findById(params);
      return res.json(rankinzada);
    } catch (error) {
      next(error);
    }
  },
  async updateRankinzada(req: Request, res: Response, next: NextFunction) {
    try {
      const params = findRankinzadaByIdRankinzadaSchema.parse(req.params);
      const payload = updateRankinzadaRequestSchema.parse(req.body);
      const updated = await rankinzadaService.updateRankinzada(
        params.id,
        payload,
      );
      return res.json(updated);
    } catch (error) {
      next(error);
    }
  },
  async deleteRankinzada(req: Request, res: Response, next: NextFunction) {
    try {
      const params = findRankinzadaByIdRankinzadaSchema.parse(req.params);
      const deleted = await rankinzadaService.deleteRankinzada(params.id);
      if (deleted) {
        return res.sendStatus(204);
      }
    } catch (error) {
      next(error);
    }
  },
};
