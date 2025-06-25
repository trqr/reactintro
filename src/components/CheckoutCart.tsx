import {useCart} from "../context/useCart.tsx";
import type {cartItem} from "../context/CartProvider.tsx";
import {Alert, Box, Button, FormControl, ListItem, ListItemAvatar, ListItemText, TextField} from "@mui/material";
import api from "../services/api.tsx";
import {useState} from "react";


const CheckoutCart = () => {
    const { cart } = useCart();
    const { removeFromCart, getCartTotal} = useCart();
    const [promoCode, setPromoCode] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPromoCode(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPromoCode(promoCode);
        const response = await api.post('/codepromo', {
            code: promoCode,
        });
        if (response.data.success) {
            setSuccessMessage(response.data.message || 'Code promo appliqué avec succès.');
            setErrorMessage('');
        } else {
            setErrorMessage(response.data.message || 'Le code promo est invalide.');
            setSuccessMessage('');
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
                                      primary={"0 €"}/>
                              }>
                        <ListItemText
                            className={"checkout-text-subtotal list-checkout"}
                            primary={"CodePromo :"}/>
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
                                variant="contained"
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