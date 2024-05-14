/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../../Layout/Layout";
import logo from "../../../assets/R__1_-removebg-preview.png";
import { useState } from "react";
import axios from "axios";

const SignUP = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const [gender, setGender] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post("/api/v1/userAuth/signup", { name, email, password, answer, gender });
            if (res.data.success) {
                alert("Account created successfully!");
                navigate("/login");
            }
            else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with signup ${error}`);
        }
    }


    return (
        <Layout>
            <main className="w-full h-full flex flex-col items-center justify-center bg-gray-50 sm:px-4">
                <div className="w-full space-y-6 text-gray-600 sm:max-w-md shadow-gray-300">
                    <div className="text-center">
                        <img src={logo} width={150} className="mx-auto" />
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Create an account</h3>
                            <p className="">Already have an account? <Link to={"/login"} className="font-medium text-indigo-600 hover:text-indigo-500">Log in</Link></p>
                        </div>
                    </div>
                    <div className="bg-white shadow-gray-300 shadow-md p-4 py-6 sm:p-6 sm:rounded-lg">
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5">
                            <div>
                                <label className="font-medium">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter Name..."
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter Email..."
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
                                    placeholder="Enter Password..."
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg" />
                            </div>
                            <div>
                                <label className="font-medium">
                                    Favourite Sport
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Your favourite sport name..."
                                    onChange={(e) => setAnswer(e.target.value)}
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="font-medium">
                                    Gender
                                </label>
                                <label
                                    htmlFor="DeliveryStandard"
                                    className="mt-2 flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500">
                                    <div>
                                        <p className="text-gray-700">Male</p>
                                    </div>

                                    <input
                                        type="radio"
                                        name="gender"
                                        value="DeliveryStandard"
                                        id="DeliveryStandard"
                                        checked={gender === 'Male'}
                                        onChange={() => setGender('Male')}
                                        className="size-5 border-[2px] border-gray-300 text-blue-500" />
                                </label>
                            </div>

                            <div>
                                <label
                                    htmlFor="DeliveryPriority"
                                    className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500">
                                    <div>
                                        <p className="text-gray-700">Female</p>
                                    </div>

                                    <input
                                        type="radio"
                                        name="gender"
                                        value="DeliveryPriority"
                                        id="DeliveryPriority"
                                        checked={gender === 'Female'}
                                        onChange={() => setGender('Female')}
                                        className="size-5 border-gray-300 text-blue-500" />
                                </label>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                                Create account
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default SignUP;