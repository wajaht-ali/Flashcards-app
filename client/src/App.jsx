import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx"
import SignUP from "./components/pages/Auth/SignUp.jsx"
import Login from "./components/pages/Auth/Login.jsx";
import PrivateRoute from "../src/components/routes/ProtectedRoute.jsx";
import AdminDashboard from "./components/pages/Admin/Dashboard.jsx";
import AdminRoute from "./components/routes/AdminRoute.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import Users from "./components/pages/Admin/Users.jsx";
import UserDashboard from "./components/pages/User/UserDashboard.jsx";
import Cards from "./components/pages/Admin/Cards.jsx";
import Gemini from "./components/Gemini.jsx";
import UpdateUser from "./components/pages/Admin/UpdateUser.jsx";
import ChatHistory from "./components/ChatHistory.jsx";

function App() {
  return (
    <div className="font-poppins">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ask-gemini" element={<Gemini />} />
        <Route path="/chat/c/:id" element={<ChatHistory />} />

        {/* User Dashboard */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
        </Route>

        {/* Admin Dashboard */}
        <Route path="/dashboard" element={<AdminRoute />} >
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-card" element={<Cards />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/users/update-user/:id" element={<UpdateUser />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App