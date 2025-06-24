import ProductCard from "./ProductCard/ProductCard.tsx";
import type {Product} from "../models/product.tsx";
import '../styles/ProductList.css';
import * as React from "react";
import {useState, useEffect} from "react";
import Filters from "./Filters.tsx";
import type { SelectChangeEvent } from "@mui/material/Select";
import SortProducts from "./common/SortProducts.tsx";
import {fetchFilteredProducts} from "../utils/productUtils.tsx";
import {CircularProgress} from "@mui/material";
import {useLoaderData} from "react-router-dom";

const ProductList = () => {
    const products = useLoaderData();
    const [mappedProducts, setMappedProducts] = useState<Product[]>(products);
    const [searchValue, setSearchValue] = useState<string>("");
    const [selectedBrand, setSelectedBrand] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(250);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 250]);
    const [stockedResults, setStockedResults] = useState<Product[]>(products);
    const [sorting, setSorting] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const filters = {
        brand: selectedBrand,
        color: selectedColor,
    }

    function findMinPrice() {
        return Math.min(...mappedProducts.map(product => product.price));
    }

    function findMaxPrice() {
        return Math.max(...mappedProducts.map(product => product.price));
    }

    useEffect(() => {
        setLoading(true)
        if (selectedColor !== "" || selectedBrand !== "") {
        fetchFilteredProducts(filters, setMappedProducts)
            .then(data => {
                setMappedProducts(data);
                setStockedResults([...data]);
                console.log(data);
            });
        }
        setMinPrice(findMinPrice() - 1);
        setMaxPrice(findMaxPrice() + 1);
        setPriceRange([findMinPrice() - 1, findMaxPrice() + 1])
        setLoading(false);
    }, [selectedBrand, selectedColor]);

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setMappedProducts(stockedResults.filter(product => product.name.toLowerCase().includes(e.target.value.toLowerCase())));
        setSearchValue(e.target.value);
    }

    function ClearFilters(){
        setMappedProducts(products);
        setStockedResults(products);
        setSearchValue("");
        setSelectedBrand("");
        setSelectedColor("");
        setSorting("");
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
                    handleSelectBrand={(e) => setSelectedBrand(e.target.value)}
                    handleSelectColor={(e) => setSelectedColor(e.target.value)}
                    search={searchValue}
                    brand={selectedBrand}
                    color={selectedColor}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    priceRange={priceRange}
                    handlePriceFilter={handlePriceFilter}
                    ClearFilters={ClearFilters}
                    ></Filters>
                    <SortProducts handleSortingChange={handleSorting} sort={sorting}/>
                </div>
                {loading && <CircularProgress className={"loading"}/>}
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