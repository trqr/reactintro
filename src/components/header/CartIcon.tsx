import { ShoppingCart } from "@mui/icons-material"
import { Badge, IconButton } from "@mui/material"
import {useCart} from "../../context/useCart.tsx";
import {useEffect, useState} from "react";

const CartIcon = () => {
    const {getCartQuantity, cart} = useCart();

    const [ quantity, setQuantity ] = useState(getCartQuantity);

    useEffect(() => {
        setQuantity(getCartQuantity());
        console.log(quantity);
    }, [cart, getCartQuantity, quantity]);

    return (
        <>
            <Badge badgeContent={quantity} color="primary">
                <IconButton>
                    <ShoppingCart
                        id="cart"
                        fontSize={"medium"}
                    ></ShoppingCart>
                </IconButton>
            </Badge></>
    )
}

export default CartIcon;