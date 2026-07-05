import { NextFunction, Request, Response, Router } from "express";
import authControlelr from "../../controllers/auth.controller";

const router = Router();

router.post("/register", (req: Request, res: Response, next: NextFunction) =>
  authControlelr.register(req, res, next),
);
router.post("/login", (req: Request, res: Response, next: NextFunction) =>
  authControlelr.login(req, res, next),
);

export default router;
