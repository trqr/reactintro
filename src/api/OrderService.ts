import api from "./api.ts";
import type {Order} from "../models/order.ts";
import {toast} from "react-toastify";

export const registerOrder = (order: Order) => {

    return api.post(`/order/create-order`, order)
        .then(res => {
            const data = res.data;

            if (data.success) {
                toast.success(`Order validated : ${data.message}`);
            } else {
                toast.error(`Order failed : ${data.message}`);
            }

            return data;
        })
        .catch( () => {
            toast.error("Error while creating order.");
        });
};

export const deleteOrders = (ordersId: number[]) => {
    return api.post(`/order/delete`, ordersId)
        .then(res => {
            toast.success(`Orders has been deleted.`);
            return res.data;
        })
        .catch( error => {
            toast.error(`Error while trying to delete order(s) : ${error}`);
            return error;
        })
}

export const changeOrderStatus = async (ids: number[], status: string) => {
    return await api.post("/order/status", {
        ids: ids,
        newStatus: status
    }).then(res => {
        toast.success(`Status changed : ${status}`);
        return res.data;
    } )
        .catch( () => toast.error("Error while changing status."));
}

export const getUserOrders = async (userId: string) => {
    return api.get(`/order/user`,{ params: {userId: userId}}).then(res => res.data);
}

export const getAllOrders = async () => {
    return api.get(`/order/all`).then(res => res.data);
}