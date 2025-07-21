import {Alert, Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography} from "@mui/material";
import {useOrder} from "../context/useOrder.tsx";
import {registerOrder} from "../services/OrderService.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useCart} from "../context/useCart.tsx";
import { useAuth } from "../context/useAuth.tsx";
import CheckoutRelay from "./CheckoutRelay.tsx";

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
          <Box sx={{display: "flex", flexDirection: "column", gap: 2, border: "1px solid #dfdede", width: "50%", padding: "20px"}}>
              <h2 className={"title checkout-summary-title"}>Finish your order</h2>

              <FormControl fullWidth={true} sx={{width:'100%'}}>
                  <FormLabel sx={{width: '100%'}} id="demo-radio-buttons-group-label">Delivery Options:</FormLabel>
                  <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      value={deliveryValue}
                      onChange={handleChange}
                      sx={{width: '100%'}}
                  >
                      <FormControlLabel
                          value="0"
                          control={<Radio/>}
                          label={
                              <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center" , width: "80vh"}}>
                                  <Typography>Free</Typography>
                                  <Typography sx={{marginInlineEnd: "10px"}} variant="body2" color="text.secondary">
                                      Standart delivery (5-7 days)
                                  </Typography>
                              </Box>
                          }/>
                      <FormControlLabel
                          value="4.99"
                          control={<Radio/>}
                          label={
                              <Box sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  width: "80vh"
                              }}>
                                  <Typography>4.99€</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      Delivery in relay point (2-3 days)
                                  </Typography>
                              </Box>
                          }/>
                      <FormControlLabel
                          value="9.99"
                          control={<Radio/>}
                          label={
                              <Box sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  width: "80vh"
                              }}>
                                  <Typography>9.99€</Typography>
                                  <Typography variant="body2" color="text.secondary">
                                      Express delivery (1 day)
                                  </Typography>
                              </Box>
                          }/>
                  </RadioGroup>
              </FormControl>
              {deliveryValue === "4.99" && <CheckoutRelay></CheckoutRelay>}
              <Button variant={"contained"} onClick={() => handleOrdering()}>Buy Now</Button>
              {errorMessage &&
                  <Alert severity="error" style={{marginTop: '1rem'}}>{errorMessage}</Alert>
              }
          </Box>
      </>
  );
};

export default CheckoutSummary;