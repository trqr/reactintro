import {Switch, useColorScheme} from "@mui/material";

const ThemeSwitch = () => {
    const {mode, setMode} = useColorScheme();

    const handleChange = () => {
        setMode(mode === "light" ? "dark" : "light");
    };

    return (
        <>
            <Switch checked={mode === 'dark'} onChange={handleChange}/>
        </>
    );
}

export default ThemeSwitch;