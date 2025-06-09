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
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedBrand, setSelectedBrand] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [minPrice, setMinPrice] = useState<number>(findMinPrice());
    const [maxPrice, setMaxPrice] = useState<number>(findMaxPrice());
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);

    function findMinPrice() {
        return Math.min(...mappedProducts.map(product => product.price));
    }

    function findMaxPrice() {
        return Math.max(...mappedProducts.map(product => product.price));
    }

    useEffect(() => {
        console.log("mappedProducts updated:", mappedProducts);
        setMinPrice(findMinPrice());
        setMaxPrice(findMaxPrice());
        setPriceRange([findMinPrice(), findMaxPrice()])
    }, [searchValue, selectedBrand, selectedColor]);

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setMappedProducts(mappedProducts.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase())));
        setSearchValue(e.target.value);

    }

    function handleSelectBrand(e: SelectChangeEvent){
        setMappedProducts(mappedProducts.filter(product => product.brand.toLowerCase().includes(e.target.value)));
        setSelectedBrand(e.target.value);

    }

    function handleSelectColor(e: SelectChangeEvent){
        setMappedProducts(mappedProducts.filter(product => product.color.includes(e.target.value)));
        setSelectedColor(e.target.value);
    }

    function ClearFilters(){
        setMappedProducts(products);
        setSearchValue("");
        setSelectedBrand("");
        setSelectedColor("");
    }


    const handlePriceFilter = (_event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            setPriceRange([newValue[0], newValue[1]]);
            setMappedProducts(mappedProducts.filter(product => product.price > newValue[0] && product.price < newValue[1]));
        }
    };

    return (
        <>
            <div className={"main-container"}>
                <h1 style={{textAlign:"center"}}>Our shoes</h1>
                <Filters 
                handleSearch={handleSearch} 
                handleSelectBrand={handleSelectBrand} 
                handleSelectColor={handleSelectColor}
                search={searchValue}
                brand={selectedBrand}
                color={selectedColor}
                minPrice={minPrice}
                maxPrice={maxPrice}
                priceRange={priceRange}
                handlePriceFilter={handlePriceFilter}
                ClearFilters={ClearFilters}
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