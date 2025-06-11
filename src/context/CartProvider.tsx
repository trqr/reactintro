import {createContext, useState} from "react";
import type {Product} from "../models/product.tsx";
import * as React from "react";

type cartItem =
    Product & { quantity: number };

type CartContextType = {
    cart: cartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: {children: React.ReactNode}) => {
    const [cart, setCart] = useState<cartItem[]>([]);

    function addToCart(product: Product) {
        setCart(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? {...item, quantity: item.quantity + 1}
                        : item
                );
            } else {
                return [...prev, {...product, quantity: 1}];
            }
        });
    }

    function removeFromCart(productId: number) {
        setCart(prev => prev.filter(i => i.id !== productId));
    }

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    );
}