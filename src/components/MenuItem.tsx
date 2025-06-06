import {Button} from "@mui/material";

type MenuItemProps = {
    text: string,
    onClick: () => void
}

function MenuItem({text, onClick}: MenuItemProps) {
    return (
        <a style={{color: "black", margin:"0 10px"}} onClick={() => onClick()}>{text}</a>
    )
}

export default MenuItem;