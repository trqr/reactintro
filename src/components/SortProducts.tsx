import Select, {type SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {FormControl, InputLabel} from "@mui/material";

type SortProductsProps = {
    handleSortingChange: (e : SelectChangeEvent) => void;
}

const SortProducts = ({ handleSortingChange}: SortProductsProps) => {
    return (
        <>
            <FormControl className={"sort-products"}  size="medium">
                <InputLabel id="sort-products-label">Sort</InputLabel>
                <Select
                        labelId="sort-products-label"
                        id="sort-products-select"
                        label="Sort Products"
                        variant="standard"
                        onChange={handleSortingChange}
                >

                    <MenuItem value={"sort-asc"}>Price: Low to High</MenuItem>
                    <MenuItem value={"sort-desc"}>Price: High to Low</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default SortProducts;