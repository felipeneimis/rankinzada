import { authUserSchema } from "../dto/request/auth-user.request";
import UserRepostitory from "../repositories/UserRepostitory";

export default {
    createUser: async (user: authUserSchema) => {
        try {
            const created = await UserRepostitory.create(user);
        } catch (error) {
            
        }
    }
}