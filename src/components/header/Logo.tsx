


function Logo(){
    return(
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignContent:"center", margin:"0 20px"}}>
            <img src="./sport-shoe.png" alt="logo du site" style={{width:"60px", margin: "0 5px"}}/>
            <h2 className="slogan"  style={{margin:"auto 5px", padding:"0"}}>Shooza</h2>
        </div>
    )
}

export default Logo;