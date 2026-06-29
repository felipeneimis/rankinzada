import { ZodError } from "zod";
import { authUserSchema } from "../dto/request/auth-user.request.js";
import { createUserSchema } from "../dto/request/create-user.request.js";
import UserRepostitory from "../repositories/UserRepostitory.js";
import { NextFunction, Request, Response } from "express";
import argon2 from "argon2";
import userService from "../services/userService.js";

export default class AuthController {
    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const found = await userService.loginUser(req.body);
            return res.json(found);
        } catch (error) {
            next(error);
        }   
    }

    static async register(req: Request, res: Response, next: NextFunction){
        try {
            const created = await userService.createUser(req.body)
            return res.json(created);
        }
        catch (error) {
            next(error);
        }
    }
}