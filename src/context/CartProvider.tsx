import {createContext, useState} from "react";
import type {Product} from "../models/product.tsx";
import * as React from "react";
import MySnackBar from "../components/common/mySnackBar.tsx";

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
    const [snackOpen, setSnackOpen] = useState(false);
    const [TextSnack, setTextSnack] = useState("");
    const [snackSeverity, setSnackSeverity] = useState<"success" | "error" | "info" | "warning">("info");


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
        setSnackOpen(true);
        setTextSnack("Product added to cart");
        setSnackSeverity("success");
        saveCartToLocalStorage();
    }

    function removeFromCart(productId: number) {
        setCart(prev => prev.filter(i => i.id !== productId));
        setSnackOpen(true);
        setTextSnack("Product removed from cart");
        setSnackSeverity("warning");
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
        <>
            <CartContext.Provider value={{cart, addToCart, removeFromCart, getCartQuantity, getCartTotal}}>
                {children}
            </CartContext.Provider>
            <MySnackBar open={snackOpen}
                        setOpen={setSnackOpen}
                        text={TextSnack}
                        severity={snackSeverity}
            />
        </>
    );
}