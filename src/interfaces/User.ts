import { Role } from "../../generated/prisma/enums";

export interface User {
  id?: number;
  username: string;
  role?: Role;
  password: string;
  createdAt?: Date;
}
