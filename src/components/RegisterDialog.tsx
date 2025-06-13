import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import '../styles/RegisterDialog.css';

type RegisterDialogProps = {
    isOpen: boolean;
    handleRegister: () => void;
    handleClose: () => void;
}

const RegisterDialog = ({isOpen, handleRegister, handleClose}: RegisterDialogProps) => {

    return (
        <>
            <Dialog className={"register-dialog"} open={isOpen} onClose={handleClose}>
                <DialogTitle className={"register-dialog-title"} title={"Login"}>Register</DialogTitle>
                <DialogContent className={"register-dialog-inputs"}
                               sx={{'& > :not(style)': {m: 1, width: '25ch'}}}
                >
                    <TextField id="register-userfirstname-input" label="First Name" variant="standard" type={"text"} required={true}/>
                    <TextField id="register-userlastname-input" label="Last Name" variant="standard" type={"text"}
                               required={true}/>
                    <TextField id="register-useremail-input" label="Email" variant="standard" type={"email"}
                               required={true}/>
                    <TextField id="register-userpassword-input" label="Password" variant="standard" type={"password"}
                               required={true}/>
                    <TextField id="register-verify-userpassword-input" label="Verify Password" variant="standard" type={"password"}
                               required={true}/>
                </DialogContent>
                <DialogActions className={"register-dialog-buttons"}>
                    <Button className={"register-button"} variant="contained" color="primary" onClick={handleRegister}>Register</Button>
                    <Button className={"cancel-register-button"} variant="text" color="primary"
                            onClick={handleClose}>cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default RegisterDialog;