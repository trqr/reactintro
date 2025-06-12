import type {Product} from "../../models/product.tsx";
import PrimaryButton from "../PrimaryButton.tsx";
import SecondaryButton from "../SecondaryButton.tsx";
import {useCart} from "../../context/useCart.tsx";
import { useNavigate } from "react-router-dom";
import '../../styles/ProductDetails.css';

type ProductDetailsProps = {
    product: Product;
}

const ProductDetails = ({product}: ProductDetailsProps) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    return (
        <>
            <div className={"product-container"}>
                <h1 className={"product-title"}>{product.name}</h1>
                <div className={"img-grid"}>
                    {product.img.map((img: string, index: number) =>
                    <img className={"product-img"} src={img} alt={product.name} key={index}/>)}
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

        </>
    )
}

export default ProductDetails;