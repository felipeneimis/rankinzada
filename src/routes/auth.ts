import express, { Request, Response } from 'express';
import AuthController from '../controllers/AuthController';

const router = express.Router();

router.post('/login', (req: Request, res: Response) => AuthController.register(req.body))