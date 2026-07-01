import { hash, verify } from "argon2";
import { AuthUserRequest, authUserSchema } from "../dto/request/auth-user.request";
import { createUserSchema } from "../dto/request/create-user.request";
import UserRepostitory from "../repositories/user.repository";
import { toUserResponse } from "../dto/response/create-user.response";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { generateToken } from "./token.service";


export default {
    createUser: async (user: AuthUserRequest) => {
        try {
            const body = createUserSchema.parse(user);
            const hashed = await hash(body.password);
            const created = await UserRepostitory.create({ ...body, password: hashed });
            return toUserResponse(created);
        }
        catch (error) {
            throw error;
        }
    },
    loginUser: async (data: AuthUserRequest) => {
        try {
            const body = authUserSchema.parse(data);
            const user = await UserRepostitory.findByUsername(body.username);

            if (!user) {
                throw new AppError("Credenciais inválidas", 401);
            }

            const valid = await verify(user.password, body.password);
            if (!valid) throw new AppError("Credenciais inválidas", 401);

            const token = generateToken(user);

            return { token };

        } catch (error) {
            throw error;
        }
    }
}