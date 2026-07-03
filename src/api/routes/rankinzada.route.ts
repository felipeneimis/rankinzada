import { NextFunction, Request, Response, Router } from "express";
import rankinzadaController from "../../controllers/rankinzada.controller";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => rankinzadaController.createRankinzada(req, res, next))
router.get("/", (req: Request, res: Response, next: NextFunction) => rankinzadaController.listRankinzada(req, res, next))

export default router;