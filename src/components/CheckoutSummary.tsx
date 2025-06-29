import {Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";

const CheckoutSummary = () => {
  return (
      <>
          <Box sx={{display: "flex", flexDirection: "column", gap: 2, border: "1px solid #dfdede", width: "500px", padding:}}>
              <h2 className={"title checkout-summary-title"}>Finish your order</h2>

              <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                  <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                  >
                      <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                      <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                      <FormControlLabel value="other" control={<Radio/>} label="Other"/>
                  </RadioGroup>
              </FormControl>
          </Box>
      </>
  );
};

export default CheckoutSummary;