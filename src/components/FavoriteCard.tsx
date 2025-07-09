import type {Product} from "../models/product.tsx";
import {Button} from "@mui/material";
import {useCart} from "../context/useCart.tsx";
import {useFav} from "../context/useFav.tsx";
import {useAuth} from "../context/useAuth.tsx";

type FavoriteCardProps = {
    product: Product;
}

const FavoriteCard = ({product}: FavoriteCardProps) => {
    // @ts-expect-error biendanslecontext
    const { user } = useAuth();
    // @ts-expect-error biendanslecontext
    const { addToCart } = useCart();
    const { removeFromFav } = useFav();

    return (
        <>
            <div className={"fav-card-container"}>
                {product.imagesUrl.map((image: { id: number; imgUrl: string; }) =>
                <img src={image.imgUrl} alt={product.name} key={image.id}/>)}
                <div className={"fav-card-text"}>
                    <h3>{product.name}</h3>
                    <p>Brand : {product.brand} <br/>Color : {product.color} <br/> <b>Price : {product.price} €</b></p>
                </div>
                <div className={"fav-card-buttons"}>
                    <Button variant={"contained"} onClick={() => addToCart(product)}>Add to cart</Button>
                    <Button variant={"text"} onClick={() => removeFromFav(product, user)}>Remove</Button>
                </div>
            </div>
        </>
    )
}

export default FavoriteCard