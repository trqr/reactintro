import Logo from "./Logo.tsx";
import NavBar from "./NavBar.tsx";
import AuthContainer from "./AuthContainer.tsx";

function Header(){
    return (
        <div className="header"
             style={{
                 display:"flex", flexDirection:"row", height:"60px", alignContent:"center", justifyContent:"space-between", alignItems:'center',
                 margin:"auto", boxShadow:"0px 0px 6px rgba(0, 0, 0, 0.2)"}}
        >
            <Logo></Logo>
            <NavBar></NavBar>
            <AuthContainer/>
        </div>

    )
}

export default Header;