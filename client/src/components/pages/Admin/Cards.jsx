/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Layout from '../../Layout/Layout'
import { useAuth } from '../../../context/auth'
import { FaBarsStaggered } from "react-icons/fa6";
import Sidebar from './Sidebar';

const Cards = () => {
    const [auth, setAuth] = useAuth();
    const [sidebar, setSidebar] = useState(false);
    // card states
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [status, setStatus] = useState("");
    const [content, setContent] = useState("");

    const handleSidebar = () => {
        setSidebar(!sidebar);
    }

    const handleFormSubmit = async (e) => {
        console.log(title, subject, status, content);
        // try {
        //     e.preventDefault();

        // } catch (error) {
        //     console.log(`Error with form submission ${error}`);
        // }
    }
    return (
        <Layout>
            <div className="w-full flex flex-row items-start justify-between gap-2">
                <div onClick={handleSidebar} className="w-auto hover:rounded-full cursor-pointer hover:bg-gray-100 p-4"><FaBarsStaggered size={25} /></div>
                <div className={`sidebar ${sidebar ? 'active' : ''}`}>
                    <Sidebar />
                </div>
                <div className="w-full shadow-sm shadow-gray-200 h-auto overflow-y-auto p-4">
                    <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />

                    <div className="max-w-2xl mx-auto">
                        <h2 className="font-semibold text-xl md:text-2xl text-center my-3 text-indigo-700">Create a Card</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="px-3 py-2 my-2">

                                <label htmlFor="helper-text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Topic Title</label>
                                <input type="text" id="helper-text" aria-describedby="helper-text-explanation"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title of topic..."
                                    onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="px-3 py-2 my-2">

                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Category</label>
                                <select id="countries"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={(e) => setSubject(e.target.value)}>
                                    <option selected>Choose Category</option>
                                    <option value="CS">Computer Science</option>
                                    <option value="SE">Software Engineering</option>
                                    <option value="AI">Artificial Intelligence</option>
                                    <option value="TN">Telecom & Networking</option>
                                </select>

                            </div>
                            <div>
                                <label htmlFor="helper-text" className="block pl-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Card Status</label>
                            </div>
                            <div className="flex flex-row items-center gap-4 px-3 py-2 my-2">
                                <label
                                    htmlFor="DeliveryStandard"
                                    className="mt-2 flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500">
                                    <div>
                                        <p className="text-gray-700">Public</p>
                                    </div>

                                    <input
                                        type="radio"
                                        name="gender"
                                        value="DeliveryStandard"
                                        id="DeliveryStandard"
                                        checked={status === 'Public'}
                                        onChange={() => setStatus('Public')}
                                        className="size-5 border-[2px] border-gray-300 text-blue-500" />
                                </label>
                                <label
                                    htmlFor="DeliveryPriority"
                                    className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500">
                                    <div>
                                        <p className="text-gray-700">Private</p>
                                    </div>

                                    <input
                                        type="radio"
                                        name="gender"
                                        value="DeliveryPriority"
                                        id="DeliveryPriority"
                                        checked={status === 'Private'}
                                        onChange={() => setStatus('Private')}
                                        className="size-5 border-gray-300 text-blue-500" />
                                </label>
                            </div>
                            <div className="px-3 py-2 my-2">

                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Topic Notes</label>
                                <textarea id="message" rows="10"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write your thoughts here..."
                                    onChange={(e) => setContent(e.target.value)}></textarea>

                            </div>
                            <button onClick={handleFormSubmit} type="button" className=" mx-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cards