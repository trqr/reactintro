import {createContext, useState} from "react";
import type {Product} from "../models/product.ts";
import * as React from "react";
import MySnackBar from "../components/common/mySnackBar.tsx";

export type cartItem = {
    product: Product,
    quantity: number;
}

type CartContextType = {
    cart: cartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    getCartQuantity: () => number;
    getCartTotal: () => number;
    clearCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: {children: React.ReactNode}) => {
    const [cart, setCart] = useState<cartItem[]>(loadCartFromLocalStorage());
    const [snackOpen, setSnackOpen] = useState(false);
    const [TextSnack, setTextSnack] = useState("");
    const [snackColor, setSnackColor] = useState<"success" | "error" | "info" | "warning">("info");

    function addToCart(product: Product) {
        setCart(prev => {
            const existingItem = prev.find(item => item.product.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? {...item, quantity: item.quantity + 1}
                        : item
                );
            } else {
                return [...prev, {product: product, quantity: 1}];
            }
        });
        setSnackOpen(true);
        setTextSnack("Product added to cart");
        setSnackColor("success");
        saveCartToLocalStorage();
    }

    function removeFromCart(productId: number) {
        setCart(prev => prev.filter(i => i.product.id !== productId));
        setSnackOpen(true);
        setTextSnack("Product removed from cart");
        setSnackColor("warning");
        saveCartToLocalStorage();
    }

    function getCartQuantity() {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    function getCartTotal() {
        return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    }

    function saveCartToLocalStorage() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function loadCartFromLocalStorage() {
        const cartData = localStorage.getItem("cart");
        return cartData ? JSON.parse(cartData) : [];
    }

    function clearCart() {
        localStorage.removeItem("cart");
        setCart([]);
    }

    return (
        <>
            <CartContext.Provider value={{cart, addToCart, removeFromCart, getCartQuantity, getCartTotal, clearCart}}>
                {children}
            </CartContext.Provider>
            <MySnackBar open={snackOpen}
                        setOpen={setSnackOpen}
                        text={TextSnack}
                        color={snackColor}
            />
        </>
    );
}