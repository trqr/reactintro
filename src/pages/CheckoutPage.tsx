import Header from "../components/header/Header.tsx";
import CheckoutCart from "../components/CheckoutCart.tsx";
import '../styles/CheckoutPage.css';
import CheckoutSummary from "../components/CheckoutSummary.tsx";
import {useState} from "react";


const CheckoutPage = () => {
    const [deliveryValue, setDeliveryValue] = useState<string>("0");

    const handleDeliveryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDeliveryValue(event.target.value);

    };
    return (
        <>
            <Header/>
            <h1 className={"title checkout-title"}>Checkout</h1>
            <div className={"main-container checkout-container"}>
                <CheckoutCart deliveryValue={deliveryValue}></CheckoutCart>
                <CheckoutSummary deliveryValue={deliveryValue} handleChange={handleDeliveryChange}></CheckoutSummary>
            </div>

        </>
    )
}

export default CheckoutPage;