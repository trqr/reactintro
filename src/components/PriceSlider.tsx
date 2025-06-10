import {Slider, Typography, Box} from "@mui/material";

type PriceSliderProps = {
    min: number;
    max: number;
    priceRange: number[];
    handlePriceFilter: (_event: Event, newValue: number | number[]) => void;
};

const PriceSlider = ({min, max, priceRange, handlePriceFilter} : PriceSliderProps) => {


    return (
        <Box sx={{width: 300, padding: 1}}>
            <Typography gutterBottom>Price</Typography>
            <Slider
                value={priceRange}
                onChange={handlePriceFilter}
                valueLabelDisplay="auto"
                disableSwap
                min={min}
                max={max}
                getAriaLabel={() => 'price range'}
                getAriaValueText={(val) => `${val}€`}
            />
            <Typography variant="body2">
                De {priceRange[0]}€ à {priceRange[1]}€
            </Typography>
        </Box>
    );
};

export default PriceSlider;
