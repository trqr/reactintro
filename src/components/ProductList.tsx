import ProductCard from "./ProductCard/ProductCard.tsx";
import {products} from "../datas/datas.tsx";
import SearchBar from "./SearchBar.tsx";
import type {Product} from "../models/product.tsx";
import '../styles/ProductList.css';
import * as React from "react";
import {useState} from "react";

const ProductList = () => {
    const [mappedProducts, setMappedProducts] = useState<Product[]>(products);

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setMappedProducts(products.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase())));
        console.log(mappedProducts);
    }

    return (
        <>
            <div className={"main-container"}>
                <h1 style={{textAlign:"center"}}>Our shoes</h1>
                <SearchBar handleSearch={handleSearch}></SearchBar>
                <div className={"cards-container"} style={{display:"grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "30px"}}>
                    {mappedProducts.map(((product, index) =>
                    <ProductCard key={index} product={product}></ProductCard>) )
                    }
                </div>
            </div>
        </>
    )
}

export default ProductList;