import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";


type LoginModalProps = {
    isOpen : boolean;
    handleLog: () => void;
    handleClose: () => void;
}

const LoginDialog = ({ isOpen, handleLog, handleClose}: LoginModalProps) => {

    return (
        <>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle title={"Login"}>Login</DialogTitle>
                <DialogContent
                    sx={{'& > :not(style)': {m: 1, width: '25ch'}}}
                >
                    <TextField id="useremail-input" label="Email" variant="standard" type={"email"} required={true}/>
                    <TextField id="userpassword-input" label="Password" variant="standard" type={"password"} required={true}  />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleLog}>Log in</Button>
                    <Button  variant="text" color="primary" onClick={handleClose}>cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default LoginDialog;