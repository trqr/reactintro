import CardTitle from "./CardTitle.tsx";
import CardPrice from "./CardPrice.tsx";
import '../../styles/ProductCard.css'
import PrimaryButton from "../PrimaryButton.tsx";
import {Button} from "@mui/material";
import type {Product} from "../../models/product.tsx";
import { useState} from "react";
import {useCart} from "../../context/useCart.tsx";

type ProductCardProps = {
    product: Product;
}

const ProductCard = ({product} : ProductCardProps) => {
    const [hovered, setHovered] = useState(false);
    const { addToCart } = useCart();

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
                <PrimaryButton text={"Add to cart"} handleClick={() => addToCart(product)}/>
                <Button variant="text">Show more</Button>
            </div>

        </div>
    );
};

export default ProductCard;
