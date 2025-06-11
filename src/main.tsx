import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import theme from "./styles/theme.tsx";
import {CartProvider} from "./context/CartProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <CartProvider>
          <ThemeProvider theme={theme}>
              <CssBaseline/>
                 <App />
          </ThemeProvider>
      </CartProvider>
  </StrictMode>,
)
