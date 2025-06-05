import {Typography} from "@mui/material";


function Logo(){
    return(
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignContent:"center"}}>
            <img src="./pizza.png" alt="logo du site" style={{width:"60px"}}/>
            <h2  style={{margin:"auto 5px", padding:"0"}}>FornoPizza</h2>
        </div>
    )
}

export default Logo;