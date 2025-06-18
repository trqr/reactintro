import api from "./api.tsx";

export const fetchProducts = async () => {
    return api.get("/products").then(res => res.data);
};

export const fetchFilteredProducts = async (filters) => {
    const params = new URLSearchParams(filters);
    return api.get(`/products-filters?${params.toString()}`).then(res => res.data);
}