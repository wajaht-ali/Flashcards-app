/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../Layout/Layout'
import { useAuth } from '../../../context/auth'
import { FaBarsStaggered } from "react-icons/fa6";
import Sidebar from './Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateCard = () => {
    const [auth, setAuth] = useAuth();
    const [sidebar, setSidebar] = useState(false);
    // card states
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [status, setStatus] = useState("");
    const [content, setContent] = useState("");
    const [subjData, setSubjData] = useState([]);

    const handleSidebar = () => {
        setSidebar(!sidebar);
    }
    const creator = auth?.user?.id;
    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post("/api/v1/cards/create-card", { title, subject, status, content, creator });
            if (res.data.success) {
                setTitle("");
                setSubject("");
                setStatus("");
                setContent("");
                alert("Card created successfully!");
            }
            else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with form submission ${error}`);
        }
    }
    const fetchSubjectsData = async () => {
        try {
            const res = await axios.get("/api/v1/subjects/get-all-subjects");
            if (res.data.success) {
                setSubjData(res.data.output);
            }
            else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with subject data ${error}`)
        }
    }
    useEffect(() => {
        fetchSubjectsData();
    }, [])
    // input text validation
    const myText = useRef(null);
    const charResult = useRef(null);
    const varLimit = 60;
    // text area validation
    const myTextArea = useRef(null);
    const charTextResult = useRef(null);
    const textAreaLimit = 20000;
    useEffect(() => {
        charResult.current.textContent = 0 + "/" + varLimit;
        charTextResult.current.textContent = 0 + "/" + textAreaLimit;
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
        if (myTextArea && charTextResult) {
            myTextArea.current.addEventListener("input", () => {
                const textAreaLength = myTextArea.current.value.length;
                charTextResult.current.textContent = textAreaLength + "/" + textAreaLimit;
                if (textAreaLength == textAreaLimit) {
                    charTextResult.current.style.color = "#ff2851";
                    myTextArea.current.style.borderColor = "#ff2851";
                }
                else {
                    charTextResult.current.style.color = "#333";
                    myTextArea.current.style.borderColor = "#3b82f6";
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
                        <h2 className="font-semibold text-xl md:text-2xl text-center my-3 text-indigo-700">Create a Card</h2>
                        <p className="text-center font-light">If you require any info related to your topic, ask Gemini.</p>
                        <form onSubmit={handleFormSubmit}>
                            <div className="px-3 py-2 my-2">

                                <label htmlFor="helper-text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Topic Title</label>
                                <input type="text" id="helper-text" aria-describedby="helper-text-explanation"
                                    className="input-text bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title of topic..."
                                    onChange={(e) => setTitle(e.target.value)}
                                    maxLength={60}
                                    ref={myText}
                                    value={title} />
                                <p className="result text-end my-2 text-[14px] font-light"
                                    ref={charResult} ></p>
                            </div>
                            <div className="px-3 py-2 my-2">

                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Category</label>
                                <select id="countries"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={(e) => setSubject(e.target.value)} value={subject}>
                                    {
                                        subjData.map((item, index) => (
                                            <option key={index}>{item.name}</option>
                                        ))
                                    }
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
                                    onChange={(e) => setContent(e.target.value)}
                                    ref={myTextArea}
                                    maxLength={20000} value={content}></textarea>
                                <p className="text-limit-info text-end my-2 text-[14px] font-light"
                                    ref={charTextResult}></p>
                            </div>
                            <button onClick={handleFormSubmit} type="button" className=" mx-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Submit</button>
                        </form>
                        <div className='my-4'>
                            <p className='pl-4 my-2'>Facing touble, gemini is here to help out.</p>
                            <button className='mt-2'>
                                <Link to={"/ask-gemini"} className="mx-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Ask Gemini!</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </Layout >
    )
}

export default CreateCard