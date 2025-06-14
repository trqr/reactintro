import Logo from "./Logo.tsx";
import NavBar from "./NavBar.tsx";
import AuthContainer from "./AuthContainer.tsx";
import {useEffect, useState} from "react";
import '../../styles/Header.css';
import CartIcon from "./CartIcon.tsx";

function Header(){
    const [isScrolled, setIsScrolled] = useState<boolean>(false);


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    })

    function handleScroll(){
        if (window.scrollY > 80) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    }
    return (
        <div className="header"
             style={{
                 height: isScrolled ? "70px" : "110px",
                 boxShadow: isScrolled ? "0px 0px 6px rgba(0, 0, 0, 0.2)" : "none" ,
                }}
        >
            <Logo></Logo>
            <NavBar></NavBar>
            <div className={"right-side-header"} >
                <CartIcon/>
                <AuthContainer/>
            </div>
        </div>

    )
}

export default Header;