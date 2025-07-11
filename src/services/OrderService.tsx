import api from "./api.tsx";
import type {Order} from "../models/order.tsx";
import type {User} from "../models/user.tsx";
import {toast} from "react-toastify";

export const registerOrder = (order: Order) => {
    return api.post(`/order/create-order`, order)
        .then(res => {
            const data = res.data;

            if (data.success) {
                toast.success(`Commande validée : ${data.message}`);
            } else {
                toast.error(`Échec de la commande : ${data.message}`);
            }

            return data;
        })
        .catch( () => {
            toast.error("Erreur lors de l'envoi de la commande.");
        });
};

export const getOrders = async (user: User) => {
    return api.get(`/order`,{ params: {userId: user.id}}).then(res => res.data);
}