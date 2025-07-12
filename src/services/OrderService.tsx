import api from "./api.tsx";
import type {Order} from "../models/order.tsx";
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

export const getOrders = async (userId: string) => {
    return api.get(`/order`,{ params: {userId: userId}}).then(res => res.data);
}