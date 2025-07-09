import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useAuth} from "../context/useAuth.tsx";
import {useFav} from "../context/useFav.tsx";


type LoginModalProps = {
    isOpen : boolean;
    handleClose: () => void;
}

const LoginDialog = ({ isOpen, handleClose}: LoginModalProps) => {
    // @ts-expect-error biendanslecontext
    const { login } = useAuth();
    const { getFav } = useFav();
    const loginData = {
        email: "",
        password: "",
    }

    const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        loginData.email = e.target.value;
    }

    const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        loginData.password = e.target.value;
    }

    const handleLog = async () => {
        handleClose();
        const user = await login(loginData);
        getFav(user.id);
    }

    return (
        <>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle title={"Login"}>Login</DialogTitle>
                <DialogContent
                    sx={{'& > :not(style)': {m: 1, width: '25ch'}}}
                >
                    <TextField id="useremail-input" label="Email" variant="standard" type={"email"} required={true} onChange={handleEmailInput}/>
                    <TextField id="userpassword-input" label="Password" variant="standard" type={"password"} required={true} onChange={handlePasswordInput}  />
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