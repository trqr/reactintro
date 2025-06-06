import MenuItem from "./MenuItem.tsx";
import {NavLink} from "react-router-dom";
import '../styles/NavBar.css';


function NavBar(){

    function onClick(){}

    return (
        <div>
            <NavLink to="/"><MenuItem text={"Home"} onClick={onClick}/></NavLink>
            <NavLink to="/products"><MenuItem text={"Products"} onClick={onClick}/></NavLink>
            <NavLink to="/service"><MenuItem text={"Service"} onClick={onClick}/></NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive ? "active" : ""}><MenuItem text={"Contact"} onClick={onClick}/></NavLink>
        </div>
    )
}

export default NavBar;