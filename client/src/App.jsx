import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home.jsx";
import SignUP from "./components/pages/pages/SignUp.jsx";
import Login from "./components/pages/pages/Login.jsx";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<SignUP />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
