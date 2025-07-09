import api from "./api.tsx";
import type {Order} from "../models/order.tsx";
import type {User} from "../models/user.tsx";

export const registerOrder = async (order: Order) => {
    return api.post(`/order/create-order`, order).then(res => res.data);
}

export const getOrders = async (user: User) => {
    return api.get(`/order`,{ params: {userId: user.id}}).then(res => res.data);
}