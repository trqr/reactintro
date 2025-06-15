import Home from "./pages/home"
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./components/cart/Cart.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import FavoritesPage from "./pages/FavoritesPage.tsx";


function App() {

  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/service" element={<Home/>}/>
            <Route path="/contact" element={<Home/>}/>
            <Route path="/favorites" element={<FavoritesPage/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
