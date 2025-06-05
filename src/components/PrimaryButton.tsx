import {Button} from "@mui/material";

type PrimaryButtonProps = {
    text: string;
    handleClick: () => void;
};

function PrimaryButton({text, handleClick}: PrimaryButtonProps) {
    return (
        <Button variant="contained" style={{margin: "0 5px"}} onClick={() => handleClick() }>{text}</Button>
    )
}

export default PrimaryButton;