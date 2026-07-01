// src/middlewares/authenticate.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

const { TokenExpiredError, JsonWebTokenError } = jwt;

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) throw new AppError("Token não fornecido", 401);

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; role: string;};
        req.user = payload;
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            throw new AppError("Token expirado", 401);
        }
        throw new AppError("Token inválido", 401);
    }
}