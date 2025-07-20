import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/home"
import ProductPage from "./pages/ProductPage.tsx";
import FavoritesPage from "./pages/FavoritesPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import UserOrdersPage from "./pages/UserOrdersPage.tsx";
import {getAllOrders, getUserOrders} from "./services/OrderService.tsx";
import {getProductById, getProducts} from "./services/ProductService.tsx";
import AdministrationPage from "./pages/AdministrationPage.tsx";
import ProtectedRoute from "./components/common/ProtectedRoute.tsx";
import {getPromo} from "./services/PromoService.ts";


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
        element: (
            <ProtectedRoute requiredRoles={["ADMIN", "USER"]}>
                <UserOrdersPage/>
            </ProtectedRoute>
        ),
        loader: ({params: {userid}}) => getUserOrders(userid!)
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute requiredRoles={["ADMIN"]}>
                <AdministrationPage/>
            </ProtectedRoute>
        ),
        loader: () => getAllOrders()
    },
    {
        path: "/admin/products",
        element: (
            <ProtectedRoute requiredRoles={["ADMIN"]}>
                <AdministrationPage/>
            </ProtectedRoute>
        ),
        loader: () => getProducts()
    },
    {
        path: "/admin/promos",
        element: (
            <ProtectedRoute requiredRoles={["ADMIN"]}>
                <AdministrationPage/>
            </ProtectedRoute>
        ),
        loader: () => getPromo()
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




