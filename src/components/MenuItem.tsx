import {Button} from "@mui/material";

type MenuItemProps = {
    text: string,
    onClick: () => void
}

function MenuItem({text, onClick}: MenuItemProps) {
    return (
        <Button style={{color: "black"}} variant="text" onClick={() => onClick()}>{text}</Button>
    )
}

export default MenuItem;