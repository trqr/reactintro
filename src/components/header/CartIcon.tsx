import { ShoppingCart } from "@mui/icons-material"
import {Badge, IconButton, Menu} from "@mui/material"
import {useCart} from "../../context/useCart.tsx";
import {useEffect, useState} from "react";
import Cart from "../cart/Cart.tsx";

const CartIcon = () => {
    // @ts-expect-error biendanslecontext
    const {getCartQuantity, cart} = useCart();

    const [ quantity, setQuantity ] = useState(getCartQuantity);
    const [ isOpen, setIsOpen ] = useState(false);

    useEffect(() => {
        setQuantity(getCartQuantity());
    }, [cart, getCartQuantity, quantity]);

    return (
        <>
            <Badge badgeContent={quantity} color="primary">
                <IconButton>
                    <ShoppingCart
                        id="cart"
                        fontSize={"medium"}
                        onClick={() => setIsOpen(true)}
                    ></ShoppingCart>
                </IconButton>
            </Badge>
            <Menu className={"cart-menu"} onClose={() => setIsOpen(false)} open={isOpen}
                  transformOrigin={{horizontal: 'right', vertical: 'top'}}
                  anchorOrigin={{horizontal: "right", vertical: 90}}>
                <Cart></Cart>
            </Menu>
        </>
    )
}

export default CartIcon;