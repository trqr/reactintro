import Home from "./pages/home"
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthContainer from "./components/AuthContainer.tsx";

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AuthContainer />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
