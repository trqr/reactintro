import type {Product} from "../models/product.tsx";
import React, {createContext, useState} from "react";
import api from "../services/api.tsx";
import type {User} from "../models/user.tsx";

type FavoriteProviderType = {
    getFav: (userId: number) => Promise<void>;
    favProducts: Product[];
    addToFav: (product: Product, user: User) => void;
    removeFromFav: (product: Product, user: User) => void;
    isFavorite: (product: Product) => boolean;
    clearFav: () => void;
}

export const FavoriteContext = createContext<FavoriteProviderType | undefined>(undefined);

export const FavoriteProvider = ({children} : {children: React.ReactNode}) => {
    const [favProducts, setFavProducts] = useState<Product[]>([]);

    async function getFav(userId: number) {
        const response = await api.get(`/fav`, {params: {userId}});
        const data = await response.data;
        setFavProducts(data);
    }

    function addToFav(product: Product, user: User) {
        if (!favProducts.some(prod => prod.id === product.id)) {
            api.post(`/fav/add?productId=${product.id}&userId=${user.id}`);
            setFavProducts([...favProducts, product]);
        }

    }

    function removeFromFav(product: Product, user: User){
        api.delete(`/fav/remove?productId=${product.id}&userId=${user.id}`);
        setFavProducts(favProducts.filter(prod => prod.id !== product.id));
    }

    function isFavorite(product: Product) {
        return favProducts.some(prod => prod.id === product.id);
    }

    function clearFav(){
        setFavProducts([]);
    }

    return (
        <>
            <FavoriteContext.Provider value={{ getFav, favProducts, addToFav, removeFromFav, isFavorite, clearFav}}>
                {children}
            </FavoriteContext.Provider>
        </>
    )
}