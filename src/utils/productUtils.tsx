import type {Product} from "../models/product.ts";
import {getFilteredProducts} from "../api/ProductService.ts";

export async function fetchFilteredProducts(
    filters: {brand: string, color: string},
    setMappedProducts: (products: Product[]) => void
) {
    let data: Product[] = [];
    data = await getFilteredProducts(filters);
    setMappedProducts(data);
    return data;
}