import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/home"
import ProductPage from "./pages/ProductPage.tsx";
import FavoritesPage from "./pages/FavoritesPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import {getOrders} from "./services/OrderService.tsx";
import {getProductById, getProducts} from "./services/ProductService.tsx";


export const router = createBrowserRouter([

    {
        path: "/",
        element: <Home/>,
        loader: () => getProducts()
    },
    {
        path: "/products/:id",
        element: <ProductPage/>,
        loader: ({params: {id}}) => getProductById(id!)
    },
    {
        path: "/orders/:userid",
        element: <OrdersPage/>,
        loader: ({params: {userid}}) => getOrders(userid!)
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
        path: "checkout",
        element: <CheckoutPage/>
    }
]);




