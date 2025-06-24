import {Slider, Typography, Box} from "@mui/material";

type PriceSliderProps = {
    min: number;
    max: number;
    priceRange: number[];
    handlePriceFilter: (_event: Event, newValue: number | number[]) => void;
};

const PriceSlider = ({min, max, priceRange, handlePriceFilter} : PriceSliderProps) => {


    return (
        <Box sx={{width: 300, padding: 2, marginTop: 4}} direction="column">
            <Typography variant="subtitle2">
                De {priceRange[0]}€ à {priceRange[1]}€
            </Typography>
            <Slider
                size={"small"}
                value={priceRange}
                onChange={handlePriceFilter}
                valueLabelDisplay="off"
                disableSwap
                min={min}
                max={max}
                getAriaLabel={() => 'price range'}
                getAriaValueText={(val) => `${val}€`}
            />

        </Box>
    );
};

export default PriceSlider;
