import Select from "@mui/material/Select";
import type {SelectChangeEvent } from "@mui/material/Select";
import SearchBar from "./SearchBar";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel } from "@mui/material";
import '../styles/Filters.css';
import CircleIcon from '@mui/icons-material/Circle';

type FiltersProps = {
    handleSearch : (e : React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectBrand : (e : SelectChangeEvent) => void;
    handleSelectColor : (e : SelectChangeEvent) => void;
}

const Filters = ({handleSearch, handleSelectBrand, handleSelectColor} : FiltersProps) => {
    return (
        <div className="filters-bar">
            <SearchBar handleSearch={handleSearch}></SearchBar>
                <FormControl className="select-brand" fullWidth>
                    <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value=""
                        label="Brand"
                        variant="filled"
                        onChange={handleSelectBrand}
                    >
                        <MenuItem value={"adidas"}>Adidas</MenuItem>
                        <MenuItem value={"nike"}>Nike</MenuItem>
                        <MenuItem value={"puma"}>Puma</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className="select-color" fullWidth>
                    <InputLabel id="demo-simple-select-label">Color</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value=""
                        label="Color"
                        variant="filled"
                        onChange={handleSelectColor}
                    >
                        <MenuItem value={"white"}><CircleIcon className="white-icon color-icon"/>White</MenuItem>
                        <MenuItem value={"red"}><CircleIcon className="red-icon color-icon"/>Red</MenuItem>
                        <MenuItem value={"black"}><CircleIcon className="black-icon color-icon"/>Black</MenuItem>
                    </Select>
                </FormControl>
        </div>
    );
};

export default Filters;