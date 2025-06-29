import {Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import type {Order} from "../models/order.tsx";
import {useOrder} from "../context/useOrder.tsx";

type CheckoutSummaryProps = {
    deliveryValue: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckoutSummary = ({deliveryValue, handleChange}: CheckoutSummaryProps) => {
    const { order } = useOrder();
    const handleOrdering = () => {
        console.log(order);
    }

    return (
      <>
          <Box sx={{display: "flex", flexDirection: "column", gap: 2, border: "1px solid #dfdede", width: "500px", padding: "20px"}}>
              <h2 className={"title checkout-summary-title"}>Finish your order</h2>

              <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Delivery Options:</FormLabel>
                  <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      value={deliveryValue}
                      onChange={handleChange}
                  >
                      <FormControlLabel value="0" control={<Radio/>} label="FREE"/>
                      <FormControlLabel value="4.99" control={<Radio/>} label="4.99"/>
                      <FormControlLabel value="9.99" control={<Radio/>} label="9.99"/>
                  </RadioGroup>
              </FormControl>
              <Button variant={"contained"} onClick={() => handleOrdering}>Buy Now</Button>
          </Box>
      </>
  );
};

export default CheckoutSummary;