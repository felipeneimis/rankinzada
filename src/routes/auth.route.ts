import { Request, Response, Router } from 'express';
import AuthController from '../controllers/AuthController';

const router = Router();

router.post('/register', (req: Request, res: Response) => AuthController.register(req, res))
router.post('/login', (req: Request, res: Response) => AuthController.login(req, res))

export default router;