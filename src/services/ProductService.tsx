import api from "./api.tsx";
import type {Product} from "../models/product.tsx";
import {toast} from "react-toastify";

export const getProducts = async () => {
    return api.get("/products").then(res => res.data);
};

export const getVisibleProducts = async () => {
    return api.get("/products").then(res => res.data.filter((product: Product) => product.status === "visible"));
};

export const getFilteredProducts = async (filters: {brand: string, color: string}) => {
    const params = new URLSearchParams(filters).toString();
    return api.get(`/products/filters?${params}`).then(res => res.data);
}

export const getProductById = async (id: string) => {
    return api.get(`/products/${id}`).then(res => res.data);
}

export const changeProductsStock = async (ids: number[], stock: number) => {
    return await api.put("/products/stock", {
        ids: ids,
        addingStockValue: stock
    }).then(res => {
        toast.success(`Stock changed !`);
        return res.data
    }).catch( () => toast.error("Error while changing stock."));
}

export const changeProductsStatus = async (ids: number[], status: string) => {
    return await api.put("/products/status", {
        ids: ids,
        newStatus: status
    }).then(res => {
        toast.success(`Status changed to: ${status}`);
        return res.data
    }).catch(() => toast.error("Error while changing status."));
}