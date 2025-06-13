import PrimaryButton from "../PrimaryButton.tsx";
import SecondaryButton from "../SecondaryButton.tsx";
import {useState} from "react";
import LoginDialog from "../LoginDialog.tsx";


function AuthContainer(){
    const [signedIn, setSignedIn] = useState(false);
    const [isOpen , setIsOpen] = useState(false);

    function SignIn(){
        setSignedIn(true);
        setIsOpen(false);
    }

    function Register(){}

    function logOut(){
        setSignedIn(false);
    }

    return (
            <>
            { signedIn ?
                (<div className={"auth-container"} style={{display:"flex", alignContent:"center", alignItems:"center", margin:"0 20px"}}>
                    <div>Vous êtes logged!</div>
                    <SecondaryButton text={"Log out"} handleClick={logOut} />
                </div>)
                :
                (<div className={"auth-container" } style={{display:"flex", alignContent:"center", alignItems:"center", margin:"0 20px"}}>
                    <PrimaryButton text={"Sign In"} handleClick={() => setIsOpen(true)}></PrimaryButton>
                    <SecondaryButton text={"Register"} handleClick={Register}></SecondaryButton>
                </div>)
            }
            <LoginDialog isOpen={isOpen} handleLog={SignIn} handleClose={() => setIsOpen(false)} />
            </>
    )
}

export default AuthContainer;