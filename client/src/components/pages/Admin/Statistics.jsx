/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout';
import { FaBarsStaggered } from "react-icons/fa6";
import Sidebar from './Sidebar';
import axios from 'axios';
import UsersChart from './data/UsersChart.jsx';
import CardsChart from './data/CardsChart.jsx';
import PromptsChart from './data/PromptsChart.jsx';

const Statistics = () => {
    const [sidebar, setSidebar] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [cardsData, setCardsData] = useState([]);
    const [subjData, setSubjData] = useState([]);
    const [prompts, setPrompts] = useState([]);
    const API_KEY = import.meta.env.VITE_APP_API;

    const handleSidebar = () => {
        setSidebar(!sidebar);
    }
    const fetchUserData = async () => {
        try {
            const res = await axios.get(`${API_KEY}/api/v1/userAuth/get-all-users`);
            if (res.data.success) {
                setUsersData(res.data.users);
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with fetching users data ${error}`);
        }
    };
    const fetchCardsData = async () => {
        try {
            const res = await axios.get(`${API_KEY}/api/v1/cards/all-cards`);
            if (res.data.success) {
                setCardsData(res.data.output);
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with cards ${error}`)
        }
    }
    const fetchSubjData = async () => {
        try {
            const res = await axios.get(`${API_KEY}/api/v1/subjects/get-all-subjects`);
            if (res.data.success) {
                setSubjData(res.data.output);
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with subject ${error}`)
        }
    }
    const fetchGeminiData = async () => {
        try {
            const res = await axios.get(`${API_KEY}/api/v1/chat/get-prompts`);
            console.log(res.data.output);
            if (res.data.success) {
                setPrompts(res.data.output);
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with prompts ${error}`)
        }
    }

    useEffect(() => {
        fetchCardsData();
        fetchUserData();
        fetchSubjData();
        fetchGeminiData();
    }, [])
    let publicCard = 0, privateCard = 0;
    const filterCardsData = cardsData.reduce((acc, item) => {
        if (item.status === "Private") {
            acc.privateCard++;
        } else {
            acc.publicCard++;
        }
        return acc;
    }, { publicCard: 0, privateCard: 0 });

    return (
        <Layout>
            <div className="w-full flex flex-row items-start justify-between gap-2">
                <div onClick={handleSidebar} className="w-auto hover:rounded-full cursor-pointer hover:bg-gray-100 p-4"><FaBarsStaggered size={25} /></div>
                <div className={`sidebar ${sidebar ? 'active' : ''}`}>
                    <Sidebar />
                </div>
                <div className='w-full flex flex-col justify-around gap-2'>
                    <h1 className="text-blue-600 text-lg md:text-4xl m-4 text-start font-semibold">Statistics</h1>
                    <div className="w-full flex flex-col  md:flex-row items-center justify-around gap-2">
                        {/* '#0088FE', '#00C49F', '#FFBB28', '#FF8042' */}
                        <div className="bg-[#FFBB28] text-center text-white font-semibold text-xl h-[160px] w-[300px] rounded-[4px] flex flex-col items-center justify-center gap-2">
                            <h1 className="text-2xl font-semibold">Total Users</h1>
                            <p className="text-2xl">{usersData.length}</p>
                        </div>
                        <div className="bg-[#0088FE] text-center text-white font-semibold text-xl h-[160px] w-[300px] rounded-[4px] flex flex-col items-center justify-center gap-2">
                            <h1 className="text-2xl font-semibold">Total Cards</h1>
                            <p className="text-2xl">{cardsData.length}</p>
                            <div>
                                <span className="bg-gray-100 px-4 py-2 rounded text-sm mx-2 text-blue-600">Private: {filterCardsData.publicCard}</span>
                                <span className="bg-gray-100 px-4 py-2 rounded text-sm mx-2 text-blue-600">Public: {filterCardsData.privateCard}</span>
                            </div>
                        </div>
                        <div className="bg-[#00C49F] text-center text-white font-semibold text-xl h-[160px] w-[300px] rounded-[4px] flex flex-col items-center justify-center gap-2">
                            <h1 className="text-2xl font-semibold">Total Subjects</h1>
                            <p className="text-2xl">{subjData.length}</p>
                        </div>

                        <div className="bg-[#FF8042] text-center text-white font-semibold text-xl h-[160px] w-[300px] rounded-[4px] flex flex-col items-center justify-center gap-2">
                            <h1 className="text-2xl font-semibold">Total Gemini Chats</h1>
                            <p className="text-2xl">{prompts.length}</p>
                        </div>

                    </div>
                    <div className="w-full flex flex-col items-center mx-auto gap-y-4">
                        <div className="w-full md:w-[50%]">
                            <h2 className="text-blue-600 text-2xl my-4">Users Growth Per Month: </h2>
                            <UsersChart />
                        </div>
                        <div className="w-full md:w-[50%]">
                            <h2 className="text-blue-600 text-2xl my-4">Card Distribution Per Subject: </h2>
                            <CardsChart />
                        </div>
                        <div className="w-full md:w-[50%]">
                            <h2 className="text-blue-600 text-2xl my-4">Gemini Usage Per Month: </h2>
                            <PromptsChart />
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Statistics