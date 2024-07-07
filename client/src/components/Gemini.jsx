/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FaBarsStaggered } from "react-icons/fa6";
import Layout from './Layout/Layout';
import Sidebar from './Sidebar';
import { VscSend } from "react-icons/vsc";
import axios from 'axios';

const Gemini = () => {
    const [sidebar, setSidebar] = useState(false);
    // card states
    const [input, setInput] = useState("");
    const [subject, setSubject] = useState("");

    const handleSidebar = () => {
        setSidebar(!sidebar);
    }
    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post("/api/v1/chat/ask-gemini", {input});
            if(res.data.success) {
                setInput("");
            } 
            else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with form submission ${error}`);
        }
    }
    return (
        <Layout>
            <div className="w-full flex flex-row items-start justify-between gap-2">
                <div onClick={handleSidebar} className="w-auto hover:rounded-full cursor-pointer hover:bg-gray-100 p-2"><FaBarsStaggered size={20} /></div>
                <div className={`sidebar ${sidebar ? 'active' : ''}`}>
                    <Sidebar />
                </div>
                <div className="w-full shadow-sm shadow-gray-200 h-auto overflow-y-auto p-2 md:p-4 ">
                    <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />

                    <div className="h-[80vh] mx-auto shadow rounded-lg md:p-2 shadow-gray-300 flex flex-col items-center justify-between">
                        <div>Body text</div>
                        <form onSubmit={handleFormSubmit} className='w-full md:w-[900px]'>
                            <div className="w-full px-3 py-1 md:py-2 my-2 flex flex-row items-center shadow-custom rounded-2xl">
                                <input type="text"
                                    className="w-full focus:outline-none focus:ring-0 text-gray-900 text-sm border-none block px-2.5 md:py-3" placeholder="Title of topic..."
                                    onChange={(e) => setInput(e.target.value)}
                                    value={input} />
                                    <button onClick={handleFormSubmit} type="button" className="mx-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 md:py-2.5 text-center me-2"><VscSend size={25} /></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </Layout >
    )
}

export default Gemini