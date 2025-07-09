import type {Product} from "../../models/product.tsx";
import PrimaryButton from "../common/PrimaryButton.tsx";
import SecondaryButton from "../common/SecondaryButton.tsx";
import {useCart} from "../../context/useCart.tsx";
import { useNavigate } from "react-router-dom";
import '../../styles/ProductDetails.css';
import {useFav} from "../../context/useFav.tsx";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {useAuth} from "../../context/useAuth.tsx";
import LoginDialog from "../LoginDialog.tsx";
import {useState} from "react";

type ProductDetailsProps = {
    product: Product;
}

const ProductDetails = ({product}: ProductDetailsProps) => {
    // @ts-expect-error biendanslecontext
    const { user, isAuthenticated } = useAuth();
    // @ts-expect-error biendanslecontext
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const { isFavorite, addToFav, removeFromFav} = useFav();
    const [ open, setOpen ] = useState(false);

    return (
        <>
            <div className={"product-container"}>
                <h1 className={"product-title"}>
                    {product.name} {isFavorite(product)
                    ? (<Favorite color={"secondary"} fontSize={"large"} cursor={"pointer"} onClick={() => removeFromFav(product, user)} />)
                    : (<FavoriteBorder color={"disabled"} fontSize={"large"} cursor={"pointer"} onClick={() => isAuthenticated ? addToFav(product, user) : setOpen(true)} />)}
                </h1>
                <div className={"img-grid"}>
                    {product.imagesUrl.map((img) =>
                        <div key={img.id} className={"img-container"}>
                        <img className={"product-img"} src={img.imgUrl} alt={product.name} key={img.id}/>
                        </div>)}
                </div>
                <div className={"product-text-container"}>
                    <span>Brand: {product.brand}</span>
                    <span>Color: {product.color}</span>
                    <span>Price: {product.price} €</span>
                </div>
                <div className={"buttons"}>
                    <PrimaryButton text={"Add to cart"} handleClick={() => addToCart(product)}></PrimaryButton>
                    <SecondaryButton text={"Back to home"} handleClick={() => navigate("/")}></SecondaryButton>
                </div>
            </div>
            <LoginDialog isOpen={open} handleClose={() => setOpen(false)}></LoginDialog>
        </>
    )
}

export default ProductDetails;