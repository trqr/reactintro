import api from "./api.tsx";
import type {User} from "../models/user.tsx";

export const registerUser = async (user: User) => {
    return api.post(`/user/register`, user).then(res => res.data);
}