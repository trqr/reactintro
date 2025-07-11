import {Box, Divider, Skeleton, Typography} from "@mui/material";
import Header from "../components/header/Header.tsx";
import {useOrder} from "../context/useOrder.tsx";
import type {Order} from "../models/order.tsx";
import {useEffect, useState, useTransition} from "react";



const OrdersPage = () => {
    const { getUserOrders } = useOrder();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        startTransition( async () => {
            const orders = await getUserOrders();
            startTransition( () => {
                setOrders(orders);
                console.log(orders);
            })
        })
    }, [])

    return (
        <>
            <Header/>
            <Typography variant={"h4"} sx={{textAlign: "center", margin: "20px"}}>Your Orders</Typography>
            <Box sx={{display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center", alignContent: "center" }}></Box>
            {isPending ? (
                <Skeleton></Skeleton>
                )
            :
                (
                    orders.map((order: Order, index) => (
                        <>
                            <Box key={index} sx={{display: "flex", justifyContent:"flex-start", alignItems: "center", alignContent: "center", flexDirection: "row"}}>
                                <Typography variant={"caption"} sx={{margin: "10px"}}>#{order.id}</Typography>
                                <Typography variant="body2" color="textSecondary" sx={{margin: "10px"}}>Status: {order.status}</Typography>
                                <Box sx={{width: "80%", display: "flex", justifyContent: "center",
                                    alignItems: "center",
                                    alignContent: "center"}}>
                                {order.cart.map(item => (
                                    <Box sx={{margin: "10px 30px"}} >
                                        <Box sx={{height: "100px"}}>
                                            <img style={{height: "80px"}} src={item.product.imagesUrl[2].imgUrl ?? item.product.imagesUrl[1].imgUrl} alt={item.product.name}></img>
                                            <img style={{height: "80px"}}
                                                 src={item.product.imagesUrl[1].imgUrl ?? item.product.imagesUrl[1].imgUrl}
                                                 alt={item.product.name}></img>

                                            <img style={{height: "80px"}}
                                                 src={item.product.imagesUrl[3].imgUrl ?? item.product.imagesUrl[1].imgUrl}
                                                 alt={item.product.name}></img>
                                        </Box>
                                        <Box>
                                            <Typography variant={"body1"}>{item.product.name}</Typography>
                                            <Typography variant={"body2"}>Quantity: {item.quantity}</Typography>
                                        </Box>
                                    </Box>
                                ))}
                                </Box>
                                <Typography variant="body2" color="textSecondary" sx={{margin: "10px"}}>Total: {order.totalPrice.toFixed(2)} €</Typography>
                            </Box>
                            <Divider></Divider>
                        </>
                        ))
                )}
        </>
    )
}

export default OrdersPage;