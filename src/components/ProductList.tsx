import ProductCard from "./ProductCard/ProductCard.tsx";
import {products} from "../datas/datas.tsx";
import type {Product} from "../models/product.tsx";
import '../styles/ProductList.css';
import * as React from "react";
import {useState, useEffect} from "react";
import Filters from "./Filters.tsx";
import type { SelectChangeEvent } from "@mui/material/Select";

const ProductList = () => {
    const [mappedProducts, setMappedProducts] = useState<Product[]>(products);

    useEffect(() => {
    console.log("mappedProducts updated:", mappedProducts);
    }, [mappedProducts]);

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setMappedProducts(products.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase())));
    }

    function handleSelectBrand(e: SelectChangeEvent){
        setMappedProducts(products.filter(product => product.brand.toLowerCase().includes(e.target.value)));
    }

    function handleSelectColor(e: SelectChangeEvent){
        setMappedProducts(products.filter(product => product.color.includes(e.target.value)));
    }

    return (
        <>
            <div className={"main-container"}>
                <h1 style={{textAlign:"center"}}>Our shoes</h1>
                <Filters 
                handleSearch={handleSearch} 
                handleSelectBrand={handleSelectBrand} 
                handleSelectColor={handleSelectColor}
                ></Filters>
                <div className={"cards-container"} style={{display:"grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "30px"}}>
                    {mappedProducts.map(((product, index) =>
                    <ProductCard key={index} product={product}></ProductCard>) )
                    }
                </div>
            </div>
        </>
    )
}

export default ProductList;