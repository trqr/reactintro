import CardTitle from "./CardTitle.tsx";
import CardPrice from "./CardPrice.tsx";
import '../../styles/ProductCard.css'
import PrimaryButton from "../PrimaryButton.tsx";
import {Alert, Button, Snackbar, type SnackbarCloseReason} from "@mui/material";
import type {Product} from "../../models/product.tsx";
import { useState} from "react";
import {useCart} from "../../context/useCart.tsx";
import React from "react";
import {useNavigate} from "react-router-dom";

type ProductCardProps = {
    product: Product;
}

const ProductCard = ({product} : ProductCardProps) => {
    const [hovered, setHovered] = useState(false);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
        addToCart(product);
    };

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div className={"card"}>
            <img src={ hovered ? product.img[1] : product.img[0] }
                 onMouseOver={( ) => setHovered(true)}
                 onMouseOut={( ) => setHovered(false)}
                 alt="sport shoe"/>
            <div className={"product-card-text"}>
                <CardTitle title={product.name}></CardTitle>
                <CardPrice price={product.price} />
            </div>
            <div className={"product-card-buttons"}>
                <PrimaryButton text={"Add to cart"} handleClick={() => handleClick()}/>
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    >
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{width: '100%'}}>
                    Added to cart !
                     </Alert>
                </Snackbar>
                <Button variant="text" onClick={() => navigate(`/products/${product.id.toString()}`)}>Show more</Button>

            </div>

        </div>
    );
};

export default ProductCard;
