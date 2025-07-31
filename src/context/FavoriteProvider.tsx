import type {Product} from "../models/product.ts";
import React, {createContext, useState} from "react";
import api from "../api/api.ts";
import type {User} from "../models/user.ts";
import MySnackBar from "../components/common/mySnackBar.tsx";

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
    const [snackOpen, setSnackOpen] = useState(false);
    const [TextSnack, setTextSnack] = useState("");
    const [snackSeverity, setsnackSeverity] = useState<"success" | "error" | "info" | "warning">("info");


    async function getFav(userId: number) {
        const response = await api.get(`/fav`, {params: {userId}});
        const data = await response.data;
        setFavProducts(data);
    }

    function addToFav(product: Product, user: User) {
        if (!favProducts.some(prod => prod.id === product.id)) {
            api.post(`/fav/add?productId=${product.id}&userId=${user.id}`);
            setFavProducts([...favProducts, product]);
            setSnackOpen(true);
            setTextSnack("Product added to favorites");
            setsnackSeverity("success");
        }

    }

    function removeFromFav(product: Product, user: User){
        api.delete(`/fav/remove?productId=${product.id}&userId=${user.id}`);
        setFavProducts(favProducts.filter(prod => prod.id !== product.id));
        setSnackOpen(true);
        setTextSnack("Product removed from favorites");
        setsnackSeverity("warning");
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
            <MySnackBar open={snackOpen}
                        setOpen={setSnackOpen}
                        text={TextSnack}
                        color={snackSeverity}
            />
        </>
    )
}