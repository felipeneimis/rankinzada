import { NextFunction, Request, Response, Router } from "express";
import rankinzadaController from "../../controllers/rankinzada.controller";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) =>
  rankinzadaController.createRankinzada(req, res, next),
);
router.get("/", (req: Request, res: Response, next: NextFunction) =>
  rankinzadaController.listRankinzada(req, res, next),
);
router.get("/:id", (req: Request, res: Response, next: NextFunction) =>
  rankinzadaController.findRankinzada(req, res, next),
);
router.put("/:id", (req: Request, res: Response, next: NextFunction) =>
  rankinzadaController.updateRankinzada(req, res, next),
);
router.patch("/:id/status", (req: Request, res: Response, next: NextFunction) =>
  rankinzadaController.updateRankinzadaStatus(req, res, next),
);

export default router;
