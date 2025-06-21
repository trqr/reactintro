import type {Product} from "../models/product.tsx";
import React, {createContext, useState} from "react";
type FavoriteProviderType = {
    favProducts: Product[];
    addToFav: (product: Product) => void;
    removeFromFav: (product: Product) => void;
    isFavorite: (product: Product) => boolean;
}

export const FavoriteContext = createContext<FavoriteProviderType | undefined>(undefined);

export const FavoriteProvider = ({children} : {children: React.ReactNode}) => {
    const [favProducts, setFavProducts] = useState<Product[]>([]);

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
            <FavoriteContext.Provider value={{favProducts, addToFav, removeFromFav, isFavorite}}>
                {children}
            </FavoriteContext.Provider>
        </>
    )
}