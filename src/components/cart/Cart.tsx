import {useCart} from "../../context/useCart.tsx";
import MyListItem from "./MyListItem.tsx";
import type {cartItem} from "../../context/CartProvider.tsx";
import '../../styles/Cart.css';
import PrimaryButton from "../common/PrimaryButton.tsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/useAuth.tsx";
import LoginDialog from "../LoginDialog.tsx";
import {useState} from "react";

const Cart = () => {
    //@ts-expect-error biendanslecontext
    const {cart, getCartTotal} = useCart();
    //@ts-expect-error biendanslecontext
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate()
    const [ isOpen, setIsOpen ] = useState(false);

    const handleCheckout = () => {
        if (isAuthenticated){
            navigate("/checkout");
        }
        else {
            setIsOpen(true);
        }
    }

    return (
        <>
            <div className={"cart"}>
                <h1 className={"cart-title"}>Cart</h1>
                {cart.length > 0 ? (
                    <>
                        {cart.map((cartItem: cartItem) => (
                            <MyListItem
                                key={cartItem.product.id}
                                cartItem={cartItem}
                            />
                        ))}
                        <h4 className={"cart-total"} >Total: {getCartTotal().toFixed(2)} €</h4>
                        <div className={"cart-buttons"}>
                            <PrimaryButton text={"Checkout"} handleClick={() => handleCheckout()}></PrimaryButton>
                        </div>
                    </>
                ) : (
                    <h5 className={"cart-total"}>Cart is empty</h5>
                )}
            </div>
            <LoginDialog isOpen={isOpen} handleClose={() => setIsOpen(false)}/>
        </>
    )
}

export default Cart;