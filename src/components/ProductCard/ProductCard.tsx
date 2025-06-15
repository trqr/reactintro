import CardTitle from "./CardTitle.tsx";
import CardPrice from "./CardPrice.tsx";
import '../../styles/ProductCard.css'
import PrimaryButton from "../PrimaryButton.tsx";
import {Alert, Button, Snackbar, type SnackbarCloseReason} from "@mui/material";
import type {Product} from "../../models/product.tsx";
import {useEffect, useState} from "react";
import {useCart} from "../../context/useCart.tsx";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {useFav} from "../../context/useFav.tsx";

type ProductCardProps = {
    product: Product;
}

const ProductCard = ({product} : ProductCardProps) => {
    const [hovered, setHovered] = useState(false);
    const { addToCart } = useCart();
    const { favProducts, addToFav, removeFromFav, isFavorite } = useFav()
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(false);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        console.log(favProducts);
    }, [favProducts]);

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
            <div className={"card-img-container"}
                 onMouseOver={() => setHovered(true)}
                 onMouseOut={() => setHovered(false)}>
                {hovered && (
                    <FavoriteBorder
                        className={"card-fav-icon"}
                        fontSize={"medium"}
                        color={"disabled"}
                        onClick={() => addToFav(product)}
                    ></FavoriteBorder>
                )}
                {isFavorite(product) && (
                    <Favorite
                        className={"card-fav-icon"}
                        fontSize={"medium"}
                        color={"secondary"}
                        onClick={() => removeFromFav(product)}
                    ></Favorite>
                )}

                <img src={ hovered ? product.img[1] : product.img[0] }

                     alt="sport shoe"/>
            </div>
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
