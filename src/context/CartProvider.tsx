import {createContext, useState} from "react";
import type {Product} from "../models/product.tsx";
import * as React from "react";

export type cartItem =
    Product & { quantity: number };

type CartContextType = {
    cart: cartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    getCartQuantity: () => number;
    getCartTotal: () => number;
};



export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: {children: React.ReactNode}) => {
    const [cart, setCart] = useState<cartItem[]>(loadCartFromLocalStorage());

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
        saveCartToLocalStorage();
    }

    function removeFromCart(productId: number) {
        setCart(prev => prev.filter(i => i.id !== productId));
        saveCartToLocalStorage();
    }

    function getCartQuantity() {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    function getCartTotal() {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }

    function saveCartToLocalStorage() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function loadCartFromLocalStorage() {
        const cartData = localStorage.getItem("cart");
        return cartData ? JSON.parse(cartData) : [];
    }

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, getCartQuantity, getCartTotal}}>
            {children}
        </CartContext.Provider>
    );
}