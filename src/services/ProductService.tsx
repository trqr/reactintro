import api from "./api.tsx";

export const getProducts = async () => {
    return api.get("/products").then(res => res.data);
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
    }).then(res => res.data);
}