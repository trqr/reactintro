import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemText} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete";
import type {cartItem} from "../../context/CartProvider.tsx";
import {useCart} from "../../context/useCart.tsx";

type MyListItemProps = {
    cartItem : cartItem;
}

const MyListItem = ({ cartItem }: MyListItemProps) => {
    const { removeFromCart } = useCart();
    return (
        <>
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon onClick={() => removeFromCart(cartItem.id)}/>
                    </IconButton>
                }
            >
                <ListItemAvatar>
                    <Avatar sx={{width: 56, height: 56, marginRight: 2}}>
                        <img className={"cart-item-img"} src={cartItem.img[0]} alt={cartItem.name}/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={cartItem.name + "   x " + cartItem.quantity}
                    secondary={(cartItem.price*cartItem.quantity).toFixed(2) + " €"}
                />
            </ListItem>
        </>
    )
}

export default MyListItem;