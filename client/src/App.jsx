import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import "./styles/App.css";
import Home from "./components/pages/Home.jsx";

function App() {

  return (
    <div className="w-full h-screen flex flex-col items-center border p-2 font-bold text-lg">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
