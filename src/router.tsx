import {createBrowserRouter} from "react-router-dom";
import api from "./services/api.tsx";
import Home from "./pages/home"
import ProductPage from "./pages/ProductPage.tsx";
import FavoritesPage from "./pages/FavoritesPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";


export const router = createBrowserRouter([

    {
        path: "/",
        element: <Home/>,
        loader: async () => {
            return api.get("/products").then((res) => res.data);
        },
    },
    {
        path: "/products/:id",
        element: <ProductPage/>,
        loader: async ({params}) => {
            const {id} = params;
            return api.get(`/products/${id}`).then((res) => res.data);
        },
    },
    {
        path: "/service",
        element: <Home/>,
    },
    {
        path: "/contact",
        element: <Home/>,
    },
    {
        path: "/favorites",
        element: <FavoritesPage/>,
    },
    {
        path: "orders",
        element: <OrdersPage/>
    },
    {
        path: "checkout",
        element: <CheckoutPage/>
    }
]);




