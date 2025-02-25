/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/R__1_-removebg-preview.png";
import Layout from "../../Layout/Layout.jsx";
import { useAuth } from "../../../context/auth.jsx";


const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post("/api/v1/userAuth/login", { email, password });
            if (res && res.data.success) {
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem('cardAuth', JSON.stringify(res.data));
                window.location.href = "/";
            }
            else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with login component ${error}`);
        }
    }
    return (
        <Layout>
            <main className="bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center min-h-screen">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md my-3">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Loin In</h2>
                    <form id="registrationForm" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                            <input type="email" id="email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your email"
                                required
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                            <input type="password" id="password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter your password"
                                required
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <button onClick={handleSubmit} type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">Login</button>
                    </form>
                    <p className="text-center text-gray-600 mt-4">Doesn&apos;t have an account? <Link to="/register" className="text-blue-500 font-semibold">Register</Link> here.</p>
                </div>

            </main>
        </Layout>
    )
}

export default Login