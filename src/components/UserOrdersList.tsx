import {Box, Divider, Typography} from "@mui/material";
import type {Order} from "../models/order.ts";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";

type UserOrdersListProps = {
    orders: Order[];
}

const UserOrdersList = ({orders}: UserOrdersListProps) => {
    const navigate = useNavigate();

    return (
        <>
            <Typography variant={"h4"} sx={{textAlign: "center", margin: "20px"}}>Your orders</Typography>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center"
            }}></Box>
            {orders.map((order: Order, index: number) => (
                <>
                    <Box key={index} sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        alignContent: "center",
                        flexDirection: "row"
                    }}>
                        <Typography variant={"caption"} sx={{margin: "10px"}}>#{order.id}</Typography>
                        <Typography variant={"body2"}
                                    sx={{margin: "10px"}}>{dayjs(order.createdAt).format("DD MMMM YYYY à HH:mm")}</Typography>
                        <Typography variant="body2" color="textSecondary"
                                    sx={{margin: "10px"}}>Status: {order.status}</Typography>
                        <Box sx={{
                            width: "80%", display: "flex", justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center"
                        }}>
                            {order.cart.map(item => (
                                <Box sx={{margin: "10px 30px", cursor: "pointer"}}
                                     onClick={() => navigate(`/products/${item.product.id}`)}>
                                    <Box sx={{height: "100px"}}>
                                        <img style={{height: "80px"}}
                                             src={item.product.imagesUrl[2].imgUrl ?? item.product.imagesUrl[1].imgUrl}
                                             alt={item.product.name}></img>
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
                        <Typography variant="body2" color="textSecondary"
                                    sx={{margin: "10px"}}>Total: {order.totalPrice.toFixed(2)} €</Typography>
                    </Box>
                    <Divider></Divider>
                </>
            ))
            }
        </>
    )
}

export default UserOrdersList;