import Header from "../components/header/Header.tsx";
import ProductDetails from "../components/productDetails/ProductDetails.tsx";
import {useLoaderData} from "react-router-dom";

const ProductPage = () => {
    const product = useLoaderData();

    if (!product) return <div style={{textAlign:"center"}}>Product not found</div>;

    return (
        <>
            <Header/>
            <ProductDetails product={product}/>
        </>
    )
}

export default ProductPage;