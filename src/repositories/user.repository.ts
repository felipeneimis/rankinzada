import { User } from "../../generated/prisma/browser";
import { AuthUserRequest } from "../dto/request/user/auth-user.request";
import { prisma } from "../lib/prisma";

export default {
  async create(user: AuthUserRequest): Promise<User> {
    const created = await prisma.user.create({
      data: user,
    });

    return created;
  },

  async findByUsername(username: string): Promise<User | null> {
    const found = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    return found;
  },
};
