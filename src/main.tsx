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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
          <CartProvider>
              <AuthProvider>
                  <FavoriteProvider>
                      <ThemeProvider theme={theme}>
                          <CssBaseline/>
                          <App />
                      </ThemeProvider>
                  </FavoriteProvider>
              </AuthProvider>
          </CartProvider>
  </StrictMode>,
)
