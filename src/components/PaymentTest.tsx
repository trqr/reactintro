import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import Header from "./header/Header.tsx";
import {useState} from "react";

const PaymentTest = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

        // Appel backend
        const res = await fetch("http://localhost:8080/api/payment/create-payment-intent", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({amount: 1000}) // 10€ en centimes
        });

        const {clientSecret} = await res.json();

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)!
            }
        });

        if (result.error) {
            alert("Erreur : " + result.error.message);
        } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
            alert("✅ Paiement réussi !");
        }

        setLoading(false);
    };

    return (
        <>
            <Header></Header>
                <form onSubmit={handleSubmit} style={{maxWidth: 400, margin: "2rem auto"}}>
                    <CardElement/>
                    <button type="submit" disabled={!stripe || loading} style={{marginTop: "1rem"}}>
                        {loading ? "Paiement en cours..." : "Payer 10€"}
                    </button>
                </form>
        </>
    )
}

export default PaymentTest;