import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home.jsx";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
