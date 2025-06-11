import {useContext} from "react";
import {CartContext} from "../context/CartProvider.tsx";

export function useCart() {
    return useContext(CartContext);
}