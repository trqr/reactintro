import Header from "../components/header/Header.tsx";
import CheckoutCart from "../components/CheckoutCart.tsx";
import '../styles/CheckoutPage.css';
import CheckoutSummary from "../components/CheckoutSummary.tsx";
import {Grid} from "@mui/material";


const CheckoutPage = () => {
    return (
        <>
            <Header/>
            <h1 className={"title checkout-title"}>Checkout</h1>
            <div className={"main-container checkout-container"}>
                <CheckoutCart></CheckoutCart>
                <CheckoutSummary></CheckoutSummary>
            </div>

        </>
    )
}

export default CheckoutPage;