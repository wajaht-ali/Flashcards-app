/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FaBarsStaggered } from "react-icons/fa6";
import Layout from './Layout/Layout';
import Sidebar from './Sidebar';
import { VscSend } from "react-icons/vsc";
import axios from 'axios';
import MarkDown from "react-markdown";
import { FaRegCopy } from "react-icons/fa6";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { BsStars } from "react-icons/bs";

const Gemini = () => {
    const [sidebar, setSidebar] = useState(false);
    // card states
    const [prompt, setPrompt] = useState("");
    const [result, setResult] = useState("");
    const [sideData, setSideData] = useState(false);
    const navigate = useNavigate();
    const handleSidebar = () => {
        setSidebar(!sidebar);
    }
    const handleCopyText = (text) => {
        navigator.clipboard.writeText(text);
        alert("Text copied!");
    }
    const handleCopyNavigation = (text) => {
        navigator.clipboard.writeText(text);
        navigate("/dashboard/admin/create-card");
        alert("Navigated successfully!");
    }
    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post("/api/v1/chat/ask-gemini", { prompt });
            if (res.data.success) {
                setPrompt("");
                setSideData(true);
                setResult(res.data.text);
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
                    <Sidebar info={sideData} />
                </div>
                <div className="w-full h-auto overflow-y-auto px-3 p-2 md:p-4 ">
                    <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />

                    <div className="h-[80vh] mx-auto shadow rounded-lg md:p-2 shadow-gray-300 flex flex-col items-center justify-between">
                        {result ? (
                            <div className="md:w-[800px] h-full shadow-custom rounded-md p-2 overflow-y-scroll">
                                <p className='text-center font-semibold text-lg'>Here is your Result!</p>
                                <p><MarkDown>{result}</MarkDown></p>
                                <div className='w-[100px] m-2 bg-gray-100 p-2 rounded flex flex-row items-center justify-center gap-x-3 cursor-pointer'>
                                    <abbr title="Copy text">
                                        <FaRegCopy className="hover:text-blue-700" onClick={() => handleCopyText(result)} />
                                    </abbr>
                                    <abbr title="Copy text and create card">
                                        <MdOutlineLibraryAdd className="hover:text-blue-700" onClick={() => handleCopyNavigation(result)} />
                                    </abbr>
                                </div>
                            </div>
                        ) : <div className="m-auto rounded-md flex flex-col items-center justify-center p-2">
                            <BsStars size={30} className="text-blue-700 my-2" />
                            <h1 className="text-blue-700 my-2 text-2xl md:text-4xl font-semibold text-center">Ask Google Gemini Anything!</h1>
                            <span className="inline-flex m-auto my">
                                <AiOutlineSafetyCertificate className="m-auto" />
                                <p className="inline ml-2">Trusted by millions of users.</p>
                            </span>
                        </div>
                        }
                        <form onSubmit={handleFormSubmit} className='sm:w-full md:w-[800px]'>
                            <div className="px-3 py-1 md:py-2 my-2 flex flex-row items-center shadow-custom rounded-2xl">
                                <input type="text"
                                    className="w-full focus:outline-none focus:ring-0 text-gray-900 text-sm border-none block px-2.5 md:py-3" placeholder="Enter a prompt here"
                                    onChange={(e) => setPrompt(e.target.value)}
                                    value={prompt} />
                                <button onClick={handleFormSubmit} type="button" className="mx-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-4 py-2 md:py-2.5 text-center me-2"><VscSend size={25} /></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </Layout >
    )
}

export default Gemini;