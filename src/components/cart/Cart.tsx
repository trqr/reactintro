import {useCart} from "../../context/useCart.tsx";
import MyListItem from "./MyListItem.tsx";
import type {cartItem} from "../../context/CartProvider.tsx";

const Cart = () => {
    const {cart} = useCart();

    return (
        <>
            <h1>Cart</h1>
            {cart.length > 0 ? (
                cart.map((cartItem: cartItem) => (
                    <MyListItem
                        key={cartItem.id}
                        cartItem={cartItem}
                    />
                ))
            ) : (
                <h5>Cart is empty</h5>
            )}
        </>
    )
}

export default Cart;