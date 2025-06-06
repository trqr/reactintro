import Home from "./pages/home"
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Home />} />
            <Route path="/service" element={<Home/>}/>
            <Route path="/contact" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
