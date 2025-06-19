import type {Product} from "../models/product.tsx";
import {getFilteredProducts, getProducts} from "../services/ProductService.tsx";

export async function fetchAndMapProducts(
    products: Product[],
    filters: {brand: string, color: string},
    setProducts: (products: Product[]) => void,
    setMappedProducts: (products: Product[]) => void
) {
    let data: Product[] = [];
    if (products.length === 0) {
        data = await getProducts();
        setProducts(data);
    } else {
        data = await getFilteredProducts(filters);
    }
    setMappedProducts(data);
    return data;
}