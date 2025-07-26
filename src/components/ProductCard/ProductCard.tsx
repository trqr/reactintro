import CardTitle from "./CardTitle.tsx";
import CardPrice from "./CardPrice.tsx";
import '../../styles/ProductCard.css'
import PrimaryButton from "../common/PrimaryButton.tsx";
import {Box, Button, Stack, Typography} from "@mui/material";
import type {Product} from "../../models/product.tsx";
import { useState} from "react";
import {useCart} from "../../context/useCart.tsx";
import {useNavigate} from "react-router-dom";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {useFav} from "../../context/useFav.tsx";
import {useAuth} from "../../context/useAuth.tsx";
import LoginDialog from "../LoginDialog.tsx";
import SecondaryButton from "../common/SecondaryButton.tsx";
import CardCarousel from "../common/CardCarousel/CardCarousel.tsx";
import type {cartItem} from "../../context/CartProvider.tsx";

type ProductCardProps = {
    product: Product;
}

const ProductCard = ({product} : ProductCardProps) => {
    const [hovered, setHovered] = useState(false);
    // @ts-expect-error biendanslecontext
    const {user, isAuthenticated} = useAuth();
    // @ts-expect-error biendanslecontext
    const { addToCart, cart } = useCart();
    const { addToFav, removeFromFav, isFavorite } = useFav()
    const navigate = useNavigate();



    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

    const handleAddToFav = () => {
        if (isAuthenticated){
            addToFav(product, user)
        } else {
            setIsLoginDialogOpen(true);
        }
    }

    const handleClick = () => {
        addToCart(product);
    };

    const matchingItem = () => {
        return cart.find((item: cartItem) => item.product.id === product.id);
    }

    return (
        <>
        <div className={"card"}>
            <div className={"card-img-container"}
                 style={{position: "relative", cursor: "pointer"}}
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
                <CardCarousel handleClick={() => navigate(`/products/${product.id.toString()}`)} images={product.imagesUrl.map(images => images.imgUrl)}></CardCarousel>
            </div>
            <div className={"product-card-text"}>
                <CardTitle title={product.name}></CardTitle>
                <CardPrice price={product.price} />
            </div>
            <div className={"product-card-buttons"} style={{position: "relative"}}>
                {product.stock !== 0
                    ?
                    <Box sx={{display:"flex", justifyContent: "space-between", alignContent: "center", alignItems: "center", width: "100%"}}>
                        {(matchingItem())
                            ? <PrimaryButton text={`${matchingItem().quantity} added to cart`} handleClick={() => handleClick()}></PrimaryButton>
                            : <SecondaryButton text={"Add to cart"} handleClick={() => handleClick()}/>
                        }
                        {product.stock! < 4 && (<Typography variant={"caption"} color={"error"}>Only {product.stock} in stock.</Typography>)}
                    </Box>
                    :
                    <Box sx={{display: "flex", justifyContent: "space-between", flexDirection: "column", alignItems: "center"}}>
                        <Button variant={"outlined"} sx={{color: "red"}} disabled>Out of stock</Button>
                    </Box>
                }
            </div>

        </div>
        <LoginDialog isOpen={isLoginDialogOpen} handleClose={() => setIsLoginDialogOpen(false)}/>
        </>
    );
};

export default ProductCard;
