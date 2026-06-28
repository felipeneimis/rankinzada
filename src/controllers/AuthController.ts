import { ZodError } from "zod";
import { authUserSchema } from "../dto/request/auth-user.request.js";
import { createUserSchema } from "../dto/request/create-user.request.js";
import { User } from "../model/User.js";
import UserRepostitory from "../repositories/UserRepostitory.js";
import { Request, Response } from "express";


export default class AuthController {
    static async login(req: Request, res: Response) {
        const body = authUserSchema.parse(req.body);

        //    
    }

    static async register(req: Request, res: Response) {
        try {
            const body = createUserSchema.parse(req.body);

            const created = await UserRepostitory.create(body);
            return res.json(created); 
        } 
        catch (error) {
            if (error instanceof ZodError) {
                return res.json({
                    message: "Erro de validação",
                    errors: error.issues,
                });
            }
            throw error;
        }
    }
}