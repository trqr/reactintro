import React, {createContext, useState} from "react";
import type {Order} from "../models/order.tsx";
import cart from "../components/cart/Cart.tsx";

type OrderContextProps = {
    order: Order;
    setOrder: React.Dispatch<React.SetStateAction<Order>>;
}

export const OrderContext = createContext<OrderContextProps | null>(null);

export const OrderProvider= ({children}: { children: React.ReactNode }) => {
    const [order, setOrder] = useState<Order>({userEmail: "", totalPrice: 0, deliveryValue: 0, cart: []});

    return (
        <OrderContext.Provider value={{order, setOrder}}>
            {children}
        </OrderContext.Provider>
    )
}