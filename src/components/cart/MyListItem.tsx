import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemText} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import type {cartItem} from "../../context/CartProvider.tsx";
import {useCart} from "../../context/useCart.tsx";

type MyListItemProps = {
    cartItem : cartItem;
}

const MyListItem = ({ cartItem }: MyListItemProps) => {
    //@ts-expect-error biendanslecontext
    const { removeFromCart } = useCart();
    return (
        <>
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon onClick={() => removeFromCart(cartItem.product.id)}/>
                    </IconButton>
                }
            >
                <ListItemAvatar>
                    <Avatar sx={{width: 56, height: 56, marginRight: 2}}>
                        <img className={"cart-item-img"} src={cartItem.product.imagesUrl[0].imgUrl} alt={cartItem.product.name}/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={cartItem.product.name + "   x " + cartItem.quantity}
                    secondary={(cartItem.product.price*cartItem.quantity).toFixed(2) + " €"}
                />
            </ListItem>
        </>
    )
}

export default MyListItem;