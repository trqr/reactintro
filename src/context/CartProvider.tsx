import {createContext, useState} from "react";
import type {Product} from "../models/product.tsx";
import * as React from "react";

type cartItem =
    Product & { quantity: number };

type CartContextType = {
    cart: cartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: {children: React.ReactNode}) => {
    const [cart, setCart] = useState<cartItem[]>([]);

    function addToCart(product: Product) {
        setCart(cart);
    }

    function removeFromCart(productId: string) {
        setCart(prev => prev.filter(i => i.id !== productId));
    }


}