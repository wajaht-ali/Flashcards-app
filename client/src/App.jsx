import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx"
import SignUP from "./components/pages/Auth/SignUp.jsx"
import Login from "./components/pages/Auth/Login.jsx";
import PrivateRoute from "../src/components/routes/ProtectedRoute.jsx";
import Dashboard from "./components/pages/Admin/Dashboard.jsx";
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<SignUP />} />
      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="" element={<Dashboard />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App