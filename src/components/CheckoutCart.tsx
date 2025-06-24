import {useCart} from "../context/useCart.tsx";
import type {cartItem} from "../context/CartProvider.tsx";
import { Box, Button, ListItem, ListItemAvatar, ListItemText} from "@mui/material";


const CheckoutCart = () => {
    const { cart } = useCart();
    const { removeFromCart, getCartTotal} = useCart();

    return (
        <>

            <div className="checkout-cart">
                <h2 className={"title"}>Cart</h2>
                    {cart.map((cartItem: cartItem) =>
                    <ListItem
                        secondaryAction={
                            <ListItemText
                                primary={(cartItem.price * cartItem.quantity).toFixed(2) + " €"}>
                            </ListItemText>
                        }>
                        <ListItemAvatar>
                                <img className={"checkout-cart-img"} src={cartItem.imagesUrl[2].imgUrl} alt={cartItem.name}/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={cartItem.name + "   x " + cartItem.quantity}
                            secondary={<Button variant={"text"} size={"small"} onClick={() => removeFromCart(cartItem.id)}>Remove</Button>}
                        />
                    </ListItem>)}
                <Box className={"checkout-subtotal"}>
                    <ListItem className={"line-checkout"}
                    secondaryAction={
                        <ListItemText
                            primary={getCartTotal().toFixed(2) + " €"}/>
                    }>
                        <ListItemText
                            className={"checkout-text-subtotal list-checkout"}
                            primary={"Subtotal :"}/>
                    </ListItem>
                    <ListItem className={"line-checkout"}
                        secondaryAction={
                            <ListItemText
                                primary={"0 €"}/>
                        }>
                        <ListItemText
                            className={"checkout-text-subtotal list-checkout"}
                            primary={"Delivery :"}/>
                    </ListItem>
                    <ListItem className={"line-checkout"}
                        secondaryAction={
                            <ListItemText
                                primary={getCartTotal().toFixed(2) + " €"}/>
                        }>
                        <ListItemText
                            className={"checkout-text-subtotal list-checkout"}
                            primary={"Total :"}/>
                    </ListItem>
                </Box>
            </div>
        </>
    )
}
export default CheckoutCart;