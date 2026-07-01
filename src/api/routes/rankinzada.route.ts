import { NextFunction, Request, Response, Router } from "express";
import rankinzadaController from "../../controllers/rankinzada.controller";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => rankinzadaController.createRankinzada(req, res, next))


export default router;