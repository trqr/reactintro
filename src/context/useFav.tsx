import {useContext} from "react";
import {FavoriteContext} from "./FavoriteProvider.tsx";

export function useFav() {
    return useContext(FavoriteContext);
}