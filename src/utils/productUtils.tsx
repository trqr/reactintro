import type {Product} from "../models/product.tsx";
import {getFilteredProducts} from "../api/ProductService.tsx";

export async function fetchFilteredProducts(
    filters: {brand: string, color: string},
    setMappedProducts: (products: Product[]) => void
) {
    let data: Product[] = [];
    data = await getFilteredProducts(filters);
    setMappedProducts(data);
    return data;
}