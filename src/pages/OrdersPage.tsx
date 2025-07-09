import {Typography} from "@mui/material";
import Header from "../components/header/Header.tsx";
import {useOrder} from "../context/useOrder.tsx";



const OrdersPage = () => {

    const { getUserOrders } = useOrder();
    const orders = getUserOrders();
    console.log(orders);

    return (
        <>
            <Header/>
            <Typography variant="body2" color="textSecondary">testtest</Typography>
        </>
    )
}

export default OrdersPage;