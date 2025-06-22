import type {Product} from "../models/product.tsx";
import React, {createContext, useState} from "react";
import api from "../services/api.tsx";

type FavoriteProviderType = {
    getFav: (userId: number) => Promise<void>;
    favProducts: Product[];
    addToFav: (product: Product) => void;
    removeFromFav: (product: Product) => void;
    isFavorite: (product: Product) => boolean;
}

export const FavoriteContext = createContext<FavoriteProviderType | undefined>(undefined);

export const FavoriteProvider = ({children} : {children: React.ReactNode}) => {
    const [favProducts, setFavProducts] = useState<Product[]>([]);

    async function getFav(userId: number) {
        const response = await api.get(`/fav`, {params: {userId}});
        const data = await response.data;
        setFavProducts(data);
    }

    function addToFav(product: Product) {
        setFavProducts([...favProducts, product]);
    }

    function removeFromFav(product: Product) {
        setFavProducts(favProducts.filter(prod => prod !== product));
    }

    function isFavorite(product: Product) {
        return favProducts.includes(product);
    }

    return (
        <>
            <FavoriteContext.Provider value={{ getFav, favProducts, addToFav, removeFromFav, isFavorite}}>
                {children}
            </FavoriteContext.Provider>
        </>
    )
}