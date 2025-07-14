import api from "./api.tsx";
import type {Order} from "../models/order.tsx";
import {toast} from "react-toastify";
import {colors} from "@mui/material";

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

export const deleteOrders = (ordersId: number[]) => {
    return api.post(`/order/delete`, ordersId).then(res => res.data);
}

export const changeOrderStatus = async (ids: number[], status: string) => {
    return await api.post("/order/status", {
        ids: ids,
        newStatus: status
    }).then(res => res.data);
}

export const getUserOrders = async (userId: string) => {
    return api.get(`/order/user`,{ params: {userId: userId}}).then(res => res.data);
}

export const getAllOrders = async () => {
    return api.get(`/order/all`).then(res => res.data);
}