import ProductCard from "./ProductCard/ProductCard.tsx";
import {products} from "../datas/datas.tsx";
import type {Product} from "../models/product.tsx";
import '../styles/ProductList.css';
import * as React from "react";
import {useState, useEffect} from "react";
import Filters from "./Filters.tsx";
import type { SelectChangeEvent } from "@mui/material/Select";
import SortProducts from "./SortProducts.tsx";

const ProductList = () => {
    const [mappedProducts, setMappedProducts] = useState<Product[]>(products);
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedBrand, setSelectedBrand] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [minPrice, setMinPrice] = useState<number>(findMinPrice());
    const [maxPrice, setMaxPrice] = useState<number>(findMaxPrice());
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 250]);
    const [stockedResults, setStockedResults] = useState<Product[]>(mappedProducts);
    const [sorting, setSorting] = useState<string>("");

    function findMinPrice() {
        return Math.min(...mappedProducts.map(product => product.price));
    }

    function findMaxPrice() {
        return Math.max(...mappedProducts.map(product => product.price));
    }

    useEffect(() => {
        console.log("mappedProducts updated:", mappedProducts);
        setMinPrice(findMinPrice()-1);
        setMaxPrice(findMaxPrice()+1);
        setPriceRange([findMinPrice()-1, findMaxPrice()+1])
        setStockedResults([...mappedProducts]);
    }, [searchValue, selectedBrand, selectedColor, sorting]);

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setMappedProducts(mappedProducts.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase())));
        setSearchValue(e.target.value);
    }

    function handleSelectBrand(e: SelectChangeEvent){
        setMappedProducts(stockedResults.filter(product => product.brand.toLowerCase().includes(e.target.value)));
        setSelectedBrand(e.target.value);
    }

    function handleSelectColor(e: SelectChangeEvent){
        setMappedProducts(stockedResults.filter(product => product.color.includes(e.target.value)));
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
            setMappedProducts(stockedResults.filter(product => product.price > newValue[0] && product.price < newValue[1]));
        }
    };

    const handleSorting = (e : SelectChangeEvent) => {
        if (e.target.value === "sort-asc"){
            setMappedProducts(stockedResults.sort((a, b) => a.price - b.price));
            setSorting("sort-asc");
        }
        if (e.target.value === "sort-desc"){
            setMappedProducts(stockedResults.sort((a, b) => b.price - a.price));
            setSorting("sort-desc");
        }
    }

    return (
        <>
            <div className={"main-container"}>
                <div className={"filters-and-sorting"}>
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
                    <SortProducts handleSortingChange={handleSorting}/>
                </div>
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