import {Box, Button, Dialog, DialogTitle, TextField} from "@mui/material";
import '../styles/LoginDialog.css';

type LoginModalProps = {
    isOpen : boolean;
    handleLog: () => void;
    handleClose: () => void;
}

const LoginDialog = ({ isOpen, handleLog, handleClose}: LoginModalProps) => {

    return (
        <>
            <Dialog className={"login-dialog"} open={isOpen}>
                <DialogTitle className={"login-dialog-title"} title={"Login"}>Login</DialogTitle>
                <Box className={"login-dialog-inputs"}
                    component="form"
                    sx={{'& > :not(style)': {m: 1, width: '25ch'}}}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="useremail-input" label="Email" variant="standard" type={"email"} required={true}/>
                    <TextField id="userpassword-input" label="Password" variant="standard" type={"password"} required={true}  />
                </Box>
                <Box className={"login-dialog-buttons"}>
                    <Button className={"login-button"} variant="contained" color="primary" onClick={handleLog}>Log in</Button>
                    <Button className={"cancel-login-button"} variant="outlined" color="primary" onClick={handleClose}>cancel</Button>
                </Box>
            </Dialog>
        </>
    )
}

export default LoginDialog;