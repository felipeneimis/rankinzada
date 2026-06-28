import { createUserSchema } from "../dto/request/createUser.request.js";
import { User } from "../model/User.js";


export default class AuthController {
    static login(user: User) {
       
    }

    static register(user: User) {
        const body = createUserSchema.parse(user);
    }
}