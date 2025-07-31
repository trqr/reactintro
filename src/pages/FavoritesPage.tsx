import FavoriteCard from "../components/FavoriteCard.tsx";
import Header from "../components/header/Header.tsx";
import {useFav} from "../context/useFav.tsx";
import type {Product} from "../models/product.ts";
import "../styles/FavoritesPage.css"

const FavoritesPage = () => {
    const { favProducts } = useFav()

    if (favProducts.length === 0) {
        return (
            <>
                <Header/>
                <h2 style={{textAlign: "center"}}>You dont have any favorites!</h2>
            </>
        )
    }

    return (
        <>
            <Header/>
            <h1 style={{textAlign:"center"}}>Your Favorites Shoes</h1>
            {favProducts.map( (favorite: Product) =>
                <FavoriteCard key={favorite.id} product={favorite}>
                </FavoriteCard>)}
        </>
    )
}

export default FavoritesPage;