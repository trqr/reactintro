import Logo from "./Logo.tsx";
import NavBar from "./NavBar.tsx";
import AuthContainer from "./AuthContainer.tsx";

function Header(){
    return (
        <div className="header" style={{display:"flex", flexDirection:"row", height:"40px", alignContent:"center", justifyContent:"space-between"}}>
            <Logo></Logo>
            <NavBar></NavBar>
            <AuthContainer/>
        </div>

    )
}

export default Header;