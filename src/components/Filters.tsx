import Select from "@mui/material/Select";
import type {SelectChangeEvent } from "@mui/material/Select";
import SearchBar from "./common/SearchBar.tsx";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, IconButton, InputLabel} from "@mui/material";
import '../styles/Filters.css';
import CircleIcon from '@mui/icons-material/Circle';
import { Close } from "@mui/icons-material";
import PriceSlider from "./common/PriceSlider.tsx";

type FiltersProps = {
    handleSearch : (e : React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectBrand : (e : SelectChangeEvent) => void;
    handleSelectColor : (e : SelectChangeEvent) => void;
    search : string;
    brand : string;
    color : string
    minPrice : number;
    maxPrice : number;
    priceRange: number[];
    handlePriceFilter: (_event: React.SyntheticEvent | Event, newValue: number | number[]) => void;
    ClearFilters : () => void;
}

const Filters = ({handleSearch, handleSelectBrand, handleSelectColor, search, brand, color, minPrice, maxPrice, priceRange, handlePriceFilter, ClearFilters} : FiltersProps) => {
    return (
        <div className="filters-bar">
            <SearchBar
                handleSearch={handleSearch}
                search={search}
            ></SearchBar>
            <FormControl className="select-brand">
                <InputLabel id="select-brand-label">Brand</InputLabel>
                <Select
                    labelId="select-brand-label"
                    id="select-brand"
                    value={brand}
                    label="Brand"
                    variant="standard"
                    onChange={handleSelectBrand}
                >
                    <MenuItem value={"Adidas"}>Adidas</MenuItem>
                    <MenuItem value={"Nike"}>Nike</MenuItem>
                    <MenuItem value={"Puma"}>Puma</MenuItem>
                    <MenuItem value={"Converse"}>Converse</MenuItem>
                    <MenuItem value={"New Balance"}>New Balance</MenuItem>
                    <MenuItem value={"Vans"}>Vans</MenuItem>
                    <MenuItem value={"Reebok"}>Reebok</MenuItem>
                    <MenuItem value={"Camper"}>Camper</MenuItem>

                </Select>
            </FormControl>
            <FormControl className="select-color">
                <InputLabel id="select-color-label">Color</InputLabel>
                <Select
                    labelId="select-color-label"
                    id="select-color"
                    value={color}
                    label="Color"
                    variant="standard"
                    onChange={handleSelectColor}
                >
                    <MenuItem className="select-color-item" value={"white"}><CircleIcon className="white-icon color-icon"/>White</MenuItem>
                    <MenuItem value={"red"}><CircleIcon className="red-icon color-icon"/>Red</MenuItem>
                    <MenuItem value={"black"}><CircleIcon className="black-icon color-icon"/>Black</MenuItem>
                    <MenuItem value={"blue"}><CircleIcon className="blue-icon color-icon"/>Blue</MenuItem>
                    <MenuItem value={"rose"}><CircleIcon className="rose-icon color-icon"/>Rose</MenuItem>
                    <MenuItem value={"gold"}><CircleIcon className="gold-icon color-icon"/>Gold</MenuItem>
                </Select>
            </FormControl>
            <PriceSlider
                min={minPrice}
                max={maxPrice}
                priceRange={priceRange}
                handlePriceFilter={handlePriceFilter}
            />
            <IconButton sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Close
                id="clear-filters-btn"
                fontSize={"small"}
                onClick={ClearFilters}
                ></Close>
            </IconButton>
        </div>
    );
};

export default Filters;