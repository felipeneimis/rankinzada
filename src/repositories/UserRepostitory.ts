import { authUserSchema } from "../dto/request/auth-user.request";
import { prisma } from "../lib/prisma";
import { User } from "../model/User";

export default {
    async create(user: authUserSchema): Promise<User> {
        const created = await prisma.user.create({
            data: user
        })

        return created;
    }
}