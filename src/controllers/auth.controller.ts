import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service.js";


export default {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const found = await userService.loginUser(req.body);
            return res.json(found);
        } catch (error) {
            next(error);
        }
    },
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const created = await userService.createUser(req.body)
            return res.json(created);
        }
        catch (error) {
            next(error);
        }
    }
}
