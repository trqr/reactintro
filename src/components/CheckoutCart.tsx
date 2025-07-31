import {useCart} from "../context/useCart.tsx";
import type {cartItem} from "../context/CartProvider.tsx";
import {Alert, Box, Button, FormControl, ListItem, ListItemAvatar, ListItemText, TextField} from "@mui/material";
import api from "../api/api.ts";
import {useEffect, useState} from "react";
import {useAuth} from "../context/useAuth.tsx";
import {useOrder} from "../context/useOrder.tsx";

type CheckoutCartProps = {
    deliveryValue: string;
}

const CheckoutCart = ({deliveryValue}: CheckoutCartProps) => {
    //@ts-expect-error biendanslecontext
    const { cart } = useCart();
    //@ts-expect-error biendanslecontext
    const { user } = useAuth();
    //@ts-expect-error biendanslecontext
    const { order, setOrder } = useOrder();
    //@ts-expect-error biendanslecontext
    const { removeFromCart, getCartTotal} = useCart();
    const [promoCode, setPromoCode] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [promoValue, setPromoValue] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string>('');


    useEffect(() => {
        setOrder({
            userEmail: user.email,
            promoCode: promoCode,
            deliveryValue: +deliveryValue,
            totalPrice: (getCartTotal() + (+deliveryValue) - (promoValue * getCartTotal() / 100)),
            cart: cart
        });
        setTimeout(() => console.log(order), 300)

    }, [deliveryValue, promoCode, promoValue]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPromoCode(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await api.post('/codepromo', {
            code: promoCode,
        });
        if (response.data.success) {
            setSuccessMessage(response.data.message);
            setErrorMessage('');
            setPromoValue(response.data.value);
        } else {
            setErrorMessage(response.data.message);
            setSuccessMessage('');
            setPromoValue(0);
        }
    }

    return (
        <>

            <div className="checkout-cart">
                <h2 className={"title"}>Cart</h2>
                    {cart.map((cartItem: cartItem) =>
                    <ListItem
                        secondaryAction={
                            <ListItemText
                                primary={(cartItem.product.price * cartItem.quantity).toFixed(2) + " €"}>
                            </ListItemText>
                        }>
                        <ListItemAvatar>
                                <img className={"checkout-cart-img"} src={cartItem.product.imagesUrl[2].imgUrl} alt={cartItem.product.name}/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={cartItem.product.name + "   x " + cartItem.quantity}
                            secondary={<Button variant={"text"} size={"small"} onClick={() => removeFromCart(cartItem.product.id)}>Remove</Button>}
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
                                primary={`${deliveryValue} €`}/>
                        }>
                        <ListItemText
                            className={"checkout-text-subtotal list-checkout"}
                            primary={"Delivery :"}/>
                    </ListItem>
                    {promoValue > 0 &&
                        <ListItem className={"line-checkout"}
                                  sx={{color:"green"}}
                              secondaryAction={
                                  <ListItemText
                                      primary={`-${(promoValue * getCartTotal() / 100).toFixed(2)} €`}/>
                              }>
                        <ListItemText
                            className={"checkout-text-subtotal list-checkout"}
                            primary={`CodePromo -${promoValue}% :`}/>
                        </ListItem>}
                    <ListItem className={"line-checkout"}
                              secondaryAction={
                            <ListItemText
                                primary={(getCartTotal()+(+deliveryValue)-(promoValue * getCartTotal() / 100)).toFixed(2) + " €"}/>
                        }>
                        <ListItemText
                            className={"checkout-text-subtotal list-checkout"}
                            primary={"Total :"}/>


                    </ListItem>
                </Box>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth={true} sx={{marginTop: 0}}>
                        <Box sx={{display: "flex", justifyContent: "space-between", alignContent: "center", alignItems: "center"}}>
                            <TextField
                                id="filled-basic"
                                label="Code Promo"
                                variant="filled"
                                size={"small"}
                                value={promoCode}
                                onChange={handleChange}
                            />
                            <Button
                                sx={{marginBottom: "20px", width: "200px"}}
                                type="submit"
                                variant="outlined"
                                size="large"
                                color="primary"
                                style={{marginTop: '1rem'}}
                            >
                                Appliquer
                            </Button>
                        </Box>
                    </FormControl>
                    {successMessage && (
                        <Alert severity="success" style={{marginTop: '1rem'}}>{successMessage}</Alert>
                    )}
                    {errorMessage && (
                        <Alert severity="error" style={{marginTop: '1rem'}}>{errorMessage}</Alert>
                    )}
                </form>

            </div>
        </>
    )
}
export default CheckoutCart;