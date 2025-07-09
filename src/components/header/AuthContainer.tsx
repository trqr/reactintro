import PrimaryButton from "../common/PrimaryButton.tsx";
import SecondaryButton from "../common/SecondaryButton.tsx";
import {useState} from "react";
import LoginDialog from "../LoginDialog.tsx";
import RegisterDialog from "../RegisterDialog.tsx";
import AccountMenu from "./AccountMenu.tsx";
import {Avatar} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useAuth} from "../../context/useAuth.tsx";
import {useFav} from "../../context/useFav.tsx";
import ThemeSwitch from "../common/ThemeSwitch.tsx";

function AuthContainer(){
    //@ts-expect-error biendanslecontext
    const { isAuthenticated, logout } = useAuth();
    const { clearFav } = useFav();
    const [isLoginOpen , setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);




    function logOut(){
        logout();
        clearFav();
    }


    return (
            <>
            { isAuthenticated ?
                (<div className={"auth-container"} style={{display:"flex", alignContent:"center", alignItems:"center", margin:"0 20px"}}>
                    <Avatar
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx7sLJbdmCKh3Ko5fv9ahJsMGSZnIiRbz9Qg&s"
                        onClick={() => setIsAccountMenuOpen(true)}
                        style={{cursor: 'pointer', position: "relative"}}/>
                    <ArrowDropDownIcon></ArrowDropDownIcon>
                    <AccountMenu
                        open={isAccountMenuOpen}
                        handleClose={() => setIsAccountMenuOpen(false)}
                        handleLogOut={logOut} />
                </div>)
                :
                (<div className={"auth-container" } style={{display:"flex", alignContent:"center", alignItems:"center", margin:"0 20px"}}>
                    <PrimaryButton text={"Sign In"} handleClick={() => setIsLoginOpen(true)}></PrimaryButton>
                    <SecondaryButton text={"Register"} handleClick={() => setIsRegisterOpen(true)}></SecondaryButton>
                    <ThemeSwitch></ThemeSwitch>
                </div>)
            }
                <LoginDialog isOpen={isLoginOpen} handleClose={() => setIsLoginOpen(false)} />
                <RegisterDialog isOpen={isRegisterOpen} handleClose={() => setIsRegisterOpen(false)} />
            </>
    )
}

export default AuthContainer;