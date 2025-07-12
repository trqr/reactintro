import Header from "../components/header/Header.tsx";
import {useLoaderData} from "react-router-dom";
import UserOrdersList from "../components/UserOrdersList.tsx";

const UserOrdersPage = () => {
    const orders = useLoaderData();

    return (
        <>
            <Header/>
            <UserOrdersList orders={orders}></UserOrdersList>
        </>
    )
}

export default UserOrdersPage;