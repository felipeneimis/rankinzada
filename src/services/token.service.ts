import jwt from "jsonwebtoken";
import { User } from "../../generated/prisma/browser";
import { JWT_SECRET } from "../config/env";

export const generateToken = (user: User): string => {
    return jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
    );
}