import Header from "../components/header/Header.tsx";
import CheckoutCart from "../components/CheckoutCart.tsx";
import '../styles/CheckoutPage.css';


const CheckoutPage = () => {
    return (
        <>
            <Header/>
            <h1 className={"title checkout-title"}>Checkout</h1>
            <div className={"main-container checkout-container"}>
                <CheckoutCart></CheckoutCart>
            </div>

        </>
    )
}

export default CheckoutPage;