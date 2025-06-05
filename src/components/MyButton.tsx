import  { Fingerprint } from "@mui/icons-material";
import  { Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";



function MyButton() {

const [isFingerPrint, setIsFingerPrint] = useState(false);


    return (
        <div className="test">
            <IconButton aria-label="fingerprint" color="secondary" onClick={() => setIsFingerPrint(false)}>
                <Fingerprint />
            </IconButton>
            <IconButton aria-label="fingerprint" color="success" onClick={() => setIsFingerPrint(true)}>
                <Fingerprint />
            </IconButton>
            { (isFingerPrint) 
            ?
            <Button variant="outlined" startIcon={<DeleteIcon />}>DELETE</Button> 
            : 
            <div>Finger print is false</div>
            }
        </div>
    )
}

export default MyButton;

