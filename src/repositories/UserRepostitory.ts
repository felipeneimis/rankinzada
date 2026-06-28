import { prisma } from "../lib/prisma";
import { User } from "../model/User";

export default class UserRepository {
    async create(user: User): Promise<User> {
        const created = await prisma.user.create({
            data: user
        })

        return created;
    }
}