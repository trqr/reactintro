import { Search } from "@mui/icons-material";
import {InputAdornment, TextField} from "@mui/material";
import '../styles/SearchBar.css';
import * as React from "react";

type SearchBarProps = {
    handleSearch : (e : React.ChangeEvent<HTMLInputElement>) => void;
}


const SearchBar = ({handleSearch} : SearchBarProps) => {
    return (
        <>
            <TextField
                id="search-input"
                label="Search"
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <Search/>
                            </InputAdornment>
                        ),
                    },
                }}
                variant="filled"
                onKeyDown={() => handleSearch}
            />
        </>
    )
}

export default SearchBar;