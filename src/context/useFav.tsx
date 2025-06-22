import {useContext} from "react";
import {FavoriteContext} from "./FavoriteProvider.tsx";

export function useFav() {
    const context =  useContext(FavoriteContext);
    if (!context) {
        throw new Error("useFav must be used within a FavoriteProvider");
    }
    return context;
}