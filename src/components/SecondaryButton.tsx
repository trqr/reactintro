import {Button} from "@mui/material";

type SecondaryButtonProps = {
    text: string;
    handleClick: () => void;
}

function SecondaryButton({text, handleClick}: SecondaryButtonProps) {
    return (
        <Button variant="outlined" style={{margin: "0 5px"}} onClick={() => handleClick()}>{text}</Button>
    )
}

export default SecondaryButton;