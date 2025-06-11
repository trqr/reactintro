import Home from "./pages/home"
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/cart/Cart.tsx";


function App() {

  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Home />} />
            <Route path="/service" element={<Home/>}/>
            <Route path="/contact" element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
