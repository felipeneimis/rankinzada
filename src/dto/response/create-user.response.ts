import { User } from "../../../generated/prisma/browser";


export function toUserResponse(user: User) {
    return {
        id: user.id,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
    };
}