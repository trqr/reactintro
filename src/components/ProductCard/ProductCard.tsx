import CardTitle from "./CardTitle.tsx";
import CardPrice from "./CardPrice.tsx";
import '../../styles/ProductCard.css'
import PrimaryButton from "../common/PrimaryButton.tsx";
import {Alert, Button, Snackbar, type SnackbarCloseReason} from "@mui/material";
import type {Product} from "../../models/product.tsx";
import {useEffect, useState} from "react";
import {useCart} from "../../context/useCart.tsx";
import React from "react";
import {useNavigate} from "react-router-dom";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {useFav} from "../../context/useFav.tsx";
import {useAuth} from "../../context/useAuth.tsx";
import LoginDialog from "../LoginDialog.tsx";
import MySnackBar from "../common/mySnackBar.tsx";

type ProductCardProps = {
    product: Product;
}

const ProductCard = ({product} : ProductCardProps) => {
    const [hovered, setHovered] = useState(false);
    const {user, isAuthenticated} = useAuth();
    const { addToCart } = useCart();
    const { addToFav, removeFromFav, isFavorite } = useFav()
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [openAddToFav, setOpenAddToFav] = useState(false);
    const [openRemoveFromFav, setOpenRemoveFromFav] = useState(false);

    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

    const handleAddToFav = () => {
        if (isAuthenticated){
            addToFav(product, user)
            setOpenAddToFav(true);
        } else {
            setIsLoginDialogOpen(true);
        }
    }

    const handleClick = () => {
        setOpen(true);
        addToCart(product);
    };

    return (
        <>
        <div className={"card"}>
            <div className={"card-img-container"}
                 onMouseOver={() => setHovered(true)}
                 onMouseOut={() => setHovered(false)}>
                {hovered && (
                    <FavoriteBorder
                        className={"card-fav-icon"}
                        fontSize={"medium"}
                        color={"disabled"}
                        onClick={() => handleAddToFav()}
                    ></FavoriteBorder>
                )}
                {isFavorite(product) && (
                    <Favorite
                        className={"card-fav-icon"}
                        fontSize={"medium"}
                        color={"secondary"}
                        onClick={() => removeFromFav(product, user)}
                    ></Favorite>
                )}

                <img src={ hovered ? product.imagesUrl[1].imgUrl : product.imagesUrl[0].imgUrl }

                     alt="sport shoe"/>
            </div>
            <div className={"product-card-text"}>
                <CardTitle title={product.name}></CardTitle>
                <CardPrice price={product.price} />
            </div>
            <div className={"product-card-buttons"}>
                <PrimaryButton text={"Add to cart"} handleClick={() => handleClick()}/>
                <MySnackBar open={openAddToFav} setOpen={setOpenAddToFav} text={"Added to favorites"}/>
                <MySnackBar open={openRemoveFromFav} setOpen={setOpenRemoveFromFav} text={"Removed from favorites"} severity={"info"}/>
                <MySnackBar open={open} setOpen={setOpen} text={"Added to cart"}/>
                <Button variant="text" onClick={() => navigate(`/products/${product.id.toString()}`)}>Show more</Button>
            </div>

        </div>
        <LoginDialog isOpen={isLoginDialogOpen} handleClose={() => setIsLoginDialogOpen(false)}/>
        </>
    );
};

export default ProductCard;
