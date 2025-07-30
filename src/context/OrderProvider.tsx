import React, {createContext, useState} from "react";
import type {Order} from "../models/order.tsx";
import {useAuth} from "./useAuth.tsx";
import {getUserOrders} from "../api/OrderService.tsx";

type OrderContextProps = {
    order: Order;
    getUserOrders: () => Promise<never[]>;
    setOrder: React.Dispatch<React.SetStateAction<Order>>;
}

export const OrderContext = createContext<OrderContextProps | null>(null);

export const OrderProvider= ({children}: { children: React.ReactNode }) => {
    const [order, setOrder] = useState<Order>({userEmail: "", totalPrice: 0, deliveryValue: 0, cart: []});
    const { user } = useAuth();

    const getUserOrders = async () => {
        return await getUserOrders(user);
    }

    return (
        <OrderContext.Provider value={{order, getUserOrders, setOrder}}>
            {children}
        </OrderContext.Provider>
    )
}