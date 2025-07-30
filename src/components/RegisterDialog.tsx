import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import '../styles/RegisterDialog.css';
import React from "react";
import type {User} from "../models/user.tsx";
import {registerUser} from "../api/UserService.tsx";

type RegisterDialogProps = {
    isOpen: boolean;
    handleClose: () => void;
}

const RegisterDialog = ({isOpen, handleClose}: RegisterDialogProps) => {
    const userData: User = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    }

    const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        userData.firstName = e.target.value;
    }

    const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        userData.lastName = e.target.value;
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        userData.email = e.target.value;
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        userData.password = e.target.value;
    }

    const handleRegister = () => {
        registerUser(userData as User);
        handleClose();
    }

    return (
        <>
            <Dialog className={"register-dialog"} open={isOpen} onClose={handleClose}>
                <DialogTitle className={"register-dialog-title"} title={"Login"}>Register</DialogTitle>
                <DialogContent className={"register-dialog-inputs"}
                               sx={{'& > :not(style)': {m: 1, width: '25ch'}}}
                >
                    <TextField id="register-userfirstname-input" label="First Name" variant="standard" type={"text"} required={true}
                               onChange={handleFirstName}/>
                    <TextField id="register-userlastname-input" label="Last Name" variant="standard" type={"text"}
                               required={true} onChange={handleLastName}/>
                    <TextField id="register-useremail-input" label="Email" variant="standard" type={"email"}
                               required={true} onChange={handleEmail}/>
                    <TextField id="register-userpassword-input" label="Password" variant="standard" type={"password"}
                               required={true} onChange={handlePassword}/>
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