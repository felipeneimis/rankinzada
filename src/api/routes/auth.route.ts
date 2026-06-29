import { NextFunction, Request, Response, Router } from 'express';
import AuthController from '../../controllers/AuthController';

const router = Router();

router.post('/register', (req: Request, res: Response, next: NextFunction) => AuthController.register(req, res, next))
router.post('/login', (req: Request, res: Response, next: NextFunction) => AuthController.login(req, res, next))

export default router;