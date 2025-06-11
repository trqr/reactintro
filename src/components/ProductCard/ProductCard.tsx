import CardTitle from "./CardTitle.tsx";
import CardPrice from "./CardPrice.tsx";
import '../../styles/ProductCard.css'
import PrimaryButton from "../PrimaryButton.tsx";
import {Button, IconButton, Snackbar, type SnackbarCloseReason} from "@mui/material";
import type {Product} from "../../models/product.tsx";
import { useState} from "react";
import {useCart} from "../../context/useCart.tsx";
import React from "react";

type ProductCardProps = {
    product: Product;
}

function CloseIcon(props: { fontSize: string }) {
    return null;
}

const ProductCard = ({product} : ProductCardProps) => {
    const [hovered, setHovered] = useState(false);
    const { addToCart } = useCart();

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

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                Close
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );

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
                    message="Added to cart!"
                    action={action}
                />
                <Button variant="text">Show more</Button>

            </div>

        </div>
    );
};

export default ProductCard;
