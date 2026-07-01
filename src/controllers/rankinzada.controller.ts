import { NextFunction, Request, Response } from "express";
import rankinzadaService from "../services/rankinzada.service";


/** 
 * TODO: Futuramente checar role para poder saber se usuário pode ou não criar rankinzada
 * 
*/

export default{
    async createRankinzada(req: Request, res: Response, next: NextFunction){
        try {
            const created = rankinzadaService.createRankinzada(req.body);
            return res.json(created);
        } catch (error) {
            next(error)
        }
    }
}