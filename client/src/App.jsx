import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home.jsx";

function App() {

  return (
    <div className="w-full h-screen flex flex-col items-center border font-bold text-lg">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
