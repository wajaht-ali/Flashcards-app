/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../Layout/Layout'
import { useAuth } from '../../../context/auth'
import { FaBarsStaggered } from "react-icons/fa6";
import Sidebar from './Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateSubject = () => {
    const [auth, setAuth] = useAuth();
    const [sidebar, setSidebar] = useState(false);
    // card states
    const [name, setName] = useState("");

    const handleSidebar = () => {
        setSidebar(!sidebar);
    }
    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post("/api/v1/subjects/create-subject", { name });
            if (res.data.success) {
                setName("");
                alert("Subject created successfully!");
            }
            else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with form submission ${error}`);
        }
    }
    // input text validation
    const myText = useRef(null);
    const charResult = useRef(null);
    const varLimit = 30;

    useEffect(() => {
        charResult.current.textContent = 0 + "/" + varLimit;
        if (myText && charResult) {
            myText.current.addEventListener("input", () => {
                const textLength = myText.current.value.length;
                charResult.current.textContent = textLength + "/" + varLimit;
                if (textLength == varLimit) {
                    charResult.current.style.color = "#ff2851";
                    myText.current.style.borderColor = "#ff2851";
                }
                else {
                    charResult.current.style.color = "#333";
                    myText.current.style.borderColor = "#3b82f6";
                }
            })
        }

    }, [])
    return (
        <Layout>
            <div className="w-full flex flex-row items-start justify-between gap-2">
                <div onClick={handleSidebar} className="w-auto hover:rounded-full cursor-pointer hover:bg-gray-100 p-4"><FaBarsStaggered size={25} /></div>
                <div className={`sidebar ${sidebar ? 'active' : ''}`}>
                    <Sidebar />
                </div>
                <div className="w-full shadow-sm shadow-gray-200 h-auto overflow-y-auto p-4 ">
                    <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />

                    <div className="max-w-2xl mx-auto shadow rounded-lg p-2 shadow-gray-300">
                        <h2 className="font-semibold text-xl md:text-2xl text-center my-3 text-indigo-700">Create Subject</h2>
                        <p className="text-center font-light">If you require any info related to your topic, ask Gemini.</p>
                        <form onSubmit={handleFormSubmit}>
                            <div className="px-3 py-2 my-2">

                                <label htmlFor="helper-text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Name</label>
                                <input type="text" id="helper-text" aria-describedby="helper-text-explanation"
                                    className="input-text bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter subject..."
                                    onChange={(e) => setName(e.target.value)}
                                    maxLength={30}
                                    ref={myText}
                                    value={name} />
                                <p className="result text-end my-2 text-[14px] font-light"
                                    ref={charResult} ></p>
                            </div>

                            <button onClick={handleFormSubmit} type="button" className=" mx-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Submit</button>
                        </form>
                    </div>
                </div>
            </div >
        </Layout >
    )
}

export default CreateSubject;