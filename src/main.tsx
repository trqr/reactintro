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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
  </StrictMode>,
)
