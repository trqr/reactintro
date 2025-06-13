import {useCart} from "../../context/useCart.tsx";
import MyListItem from "./MyListItem.tsx";
import type {cartItem} from "../../context/CartProvider.tsx";
import '../../styles/Cart.css';
import PrimaryButton from "../PrimaryButton.tsx";

const Cart = () => {
    const {cart, getCartTotal} = useCart();

    function handleCheckout(){}

    return (
        <>
            <div className={"cart"}>
                <h1 className={"cart-title"}>Cart</h1>
                {cart.length > 0 ? (
                    <>
                        {cart.map((cartItem: cartItem) => (
                            <MyListItem
                                key={cartItem.id}
                                cartItem={cartItem}
                            />
                        ))}
                        <h4 className={"cart-total"} >Total: {getCartTotal().toFixed(2)} €</h4>
                        <div className={"cart-buttons"}>
                            <PrimaryButton text={"Checkout"} handleClick={handleCheckout}></PrimaryButton>
                        </div>
                    </>
                ) : (
                    <h5 className={"cart-total"}>Cart is empty</h5>
                )}
            </div>
        </>
    )
}

export default Cart;