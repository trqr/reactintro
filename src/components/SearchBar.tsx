import { Search } from "@mui/icons-material";
import {InputAdornment, TextField} from "@mui/material";
import '../styles/SearchBar.css';
import * as React from "react";

type SearchBarProps = {
    handleSearch : (e : React.ChangeEvent<HTMLInputElement>) => void;
    search : string;
}


const SearchBar = ({handleSearch, search} : SearchBarProps) => {
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
                variant="standard"
                value={search}
                onChange={handleSearch}
            />
        </>
    )
}

export default SearchBar;