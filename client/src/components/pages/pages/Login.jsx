/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Layout from "../../../Layout/Layout"
import logo from "../../../assets/R__1_-removebg-preview.png";
import { useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post("/api/v1/userAuth/login", { email, password });
            if(res.data.success) {
                alert("Login successfully!");
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
            <main className="w-full h-screen flex flex-col items-center justify-center px-4">
                <div className="max-w-sm w-full text-gray-600 shadow-gray-300 shadow-md p-4 rounded-md">
                    <div className="text-center">
                        <img src={logo} width={150} className="mx-auto" />
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                            <p className="">Don&apos;t have an account? <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link></p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div>
                            <label className="font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                            Sign in
                        </button>
                        <div className="text-center">
                            <Link to="/forgot-password" className="hover:text-indigo-600">Forgot password?</Link>
                        </div>
                    </form>
                </div>
            </main>
        </Layout>
    )
}

export default Login