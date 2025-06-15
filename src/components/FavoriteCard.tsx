import type {Product} from "../models/product.tsx";
import {Button} from "@mui/material";
import {useCart} from "../context/useCart.tsx";
import {useFav} from "../context/useFav.tsx";

type FavoriteCardProps = {
    product: Product;
}

const FavoriteCard = ({product}: FavoriteCardProps) => {
    const { addToCart } = useCart()
    const { removeFromFav } = useFav()

    return (
        <>
            <div className={"fav-card-container"}>
                {product.img.map((image: string) =>
                <img src={image}/>)}
                <div className={"fav-card-text"}>
                    <h3>{product.name}</h3>
                    <p>Brand : {product.brand} <br/>Color : {product.color} <br/> <b>Price : {product.price} €</b></p>
                </div>
                <div className={"fav-card-buttons"}>
                    <Button variant={"contained"} onClick={() => addToCart(product)}>Add to cart</Button>
                    <Button variant={"text"} onClick={() => removeFromFav(product)}>Remove</Button>
                </div>
            </div>
        </>
    )
}

export default FavoriteCard