import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import auth from "./auth.route";
import rankinzada from "./rankinzada.route";

const router = Router();

router.use("/auth", auth);
router.use("/rankinzadas", authenticate, rankinzada);

export default router;
