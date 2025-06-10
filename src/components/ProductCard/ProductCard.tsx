import CardTitle from "./CardTitle.tsx";
import CardPrice from "./CardPrice.tsx";
import '../../styles/ProductCard.css'
import PrimaryButton from "../PrimaryButton.tsx";
import {Button} from "@mui/material";
import type {Product} from "../../models/product.tsx";
import {useState} from "react";

type ProductCardProps = {
    product: Product;
}

const ProductCard = ({product} : ProductCardProps) => {
    const [hovered, setHovered] = useState(false);

    function addToCart(){}

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
                <PrimaryButton text={"Add To Cart"} handleClick={addToCart}/>
                <Button variant="text">Show more</Button>
            </div>

        </div>
    );
};

export default ProductCard;
