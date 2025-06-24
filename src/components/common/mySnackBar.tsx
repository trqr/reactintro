import {Alert, Snackbar, type SnackbarCloseReason} from "@mui/material";
import React from "react";

type mySnackBarProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    text: string;
    color?: "success" | "error" | "info" | "warning";
}

const MySnackBar = ({open, setOpen, text, color = "success"}: mySnackBarProps) => {

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={"success"}
                    color={color}
                    variant="filled"
                    sx={{width: '100%'}}>
                    {text}
                </Alert>
            </Snackbar>
        </>
    )
}

export default MySnackBar;