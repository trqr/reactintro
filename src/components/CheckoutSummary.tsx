import {Alert, Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {useOrder} from "../context/useOrder.tsx";
import {registerOrder} from "../services/OrderService.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useCart} from "../context/useCart.tsx";
import { useAuth } from "../context/useAuth.tsx";

type CheckoutSummaryProps = {
    deliveryValue: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckoutSummary = ({deliveryValue, handleChange}: CheckoutSummaryProps) => {
    // @ts-expect-error biendanslecontext
    const { order } = useOrder();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    // @ts-expect-error biendanslecontext
    const { clearCart } = useCart();
    // @ts-expect-error biendanslecontext
    const { user } = useAuth();

    const handleOrdering = () => {
        registerOrder(order)
            .then( (data) => {
                clearCart()
                return data.success ? navigate(`/orders/${user.id}`) : setErrorMessage(data.message);
                })

            .catch(err => {
                setErrorMessage(err);
            });
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
              <Button variant={"contained"} onClick={() => handleOrdering()}>Buy Now</Button>
              {errorMessage &&
                  <Alert severity="error" style={{marginTop: '1rem'}}>{errorMessage}</Alert>
              }
          </Box>
      </>
  );
};

export default CheckoutSummary;