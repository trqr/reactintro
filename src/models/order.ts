import type {cartItem} from "../context/CartProvider.tsx";

export type Order = {
    id?: number;
    userEmail: string;
    promoCode?: string;
    deliveryValue: number;
    totalPrice: number;
    status?: string;
    cart: cartItem[];
    createdAt?: Date;
}