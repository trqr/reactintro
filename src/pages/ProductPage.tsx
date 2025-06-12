import Header from "../components/header/Header.tsx";
import ProductDetails from "../components/productDetails/ProductDetails.tsx";
import type {Product} from "../models/product.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProductById} from "../datas/datas.tsx";


const ProductPage = () => {
    const {id} = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (id) {
            const prod = getProductById(Number(id));
            setProduct(prod);
        }
    }, [id]);

    if (!product) return <div style={{textAlign:"center"}}>Product not found</div>;

    return (
        <>
            <Header/>
            <ProductDetails product={product}/>
        </>
    )
}

export default ProductPage;