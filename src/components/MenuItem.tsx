import {Button} from "@mui/material";

type MenuItemProps = {
    text: string,
    onClick: () => void
}

function MenuItem({text, onClick}: MenuItemProps) {
    return (
        <Button variant="text" onClick={() => onClick()}>{text}</Button>
    )
}

export default MenuItem;