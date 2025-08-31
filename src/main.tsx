import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import theme from "./styles/theme.tsx";
import {CartProvider} from "./context/CartProvider.tsx";
import {FavoriteProvider} from "./context/FavoriteProvider.tsx";
import {AuthProvider} from "./context/AuthProvider.tsx";
import {OrderProvider} from "./context/OrderProvider.tsx";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51S2A6nAEiNBb1SaJHj8vv17shf8kx4Imt23ZsZtRHee9x0IU4G79ye04sLDR8IeWHq7KcNPvkJPCerscvg5J8xjj00gzE4WDVf");


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider theme={theme}>
          <Elements stripe={stripePromise}>
            <CartProvider>
                  <AuthProvider>
                      <OrderProvider>
                          <FavoriteProvider>
                                  <CssBaseline/>
                                  <App />
                          </FavoriteProvider>
                      </OrderProvider>
                  </AuthProvider>
              </CartProvider>
          </Elements>
      </ThemeProvider>
  </StrictMode>,
)
