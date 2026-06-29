import { hash, verify } from "argon2";
import { authUserSchema } from "../dto/request/auth-user.request";
import { createUserSchema } from "../dto/request/create-user.request";
import UserRepostitory from "../repositories/user.repository";
import { toUserResponse } from "../dto/response/create-user.response";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";


export default {
    createUser: async (user: authUserSchema) => {
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
    loginUser: async (data: authUserSchema) => {
        try {
            const body = authUserSchema.parse(data);
            const user = await UserRepostitory.findByUsername(body.username);

            if (!user) {
                throw new AppError("Credenciais inválidas", 401);
            }

            const valid = await verify(user.password, body.password);
            if (!valid) throw new AppError("Credenciais inválidas", 401);

            const token = jwt.sign(
                { id: user.id, role: user.role },
                JWT_SECRET,
                { expiresIn: "1h" }
            );

            return { token, user: toUserResponse(user) };

        } catch (error) {
            throw error;
        }
    }
}