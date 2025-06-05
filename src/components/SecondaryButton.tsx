import {Button} from "@mui/material";

type SecondaryButtonProps = {
    text: string;
    handleClick: () => void;
}

function SecondaryButton({text, handleClick}: SecondaryButtonProps) {
    return (
        <Button variant="outlined" onClick={() => handleClick()}>{text}</Button>
    )
}

export default SecondaryButton;