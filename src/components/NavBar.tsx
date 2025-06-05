import MenuItem from "./MenuItem.tsx";


function NavBar(){

    function onClick(){}

    return (
        <div>
            <MenuItem text={"Pizza"} onClick={onClick} />
            <MenuItem text={"Carte"} onClick={onClick} />
            <MenuItem text={"Contact"} onClick={onClick} />
        </div>
    )
}

export default NavBar;