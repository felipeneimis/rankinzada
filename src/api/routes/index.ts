import { Application, Router } from "express";
import auth from './auth.route';
import rankinzada from './rankinzada.route'
import { authenticate } from "../middlewares/auth.middleware";


const router = Router()

router.use('/auth', auth)
router.use('/rankinzadas', authenticate, rankinzada)

export default router;