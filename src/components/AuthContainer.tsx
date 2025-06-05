import PrimaryButton from "./PrimaryButton.tsx";
import SecondaryButton from "./SecondaryButton.tsx";
import {useState} from "react";


function AuthContainer(){
    const [signedIn, setSignedIn] = useState(false);

    function SignIn(){
        setSignedIn(true);
    }

    function Register(){}

    function logOut(){
        setSignedIn(false);
    }

    return (
            <>
            { signedIn ?
                (<div className={"auth-container"} style={{display:"flex", alignContent:"center", alignItems:"center"}}>
                    <div>Vous êtes logged!</div>
                    <SecondaryButton text={"Log out"} handleClick={logOut} />
                </div>)
                :
                (<div className={"auth-container"}>
                    <PrimaryButton text={"Sign In"} handleClick={SignIn}></PrimaryButton>
                    <SecondaryButton text={"Register"} handleClick={Register}></SecondaryButton>
                </div>)
            }
            </>
    )
}

export default AuthContainer;