/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout';
import { FaBarsStaggered } from "react-icons/fa6";
import Sidebar from './Sidebar';
import axios from 'axios';
import UsersChart from './data/UsersChart.jsx';
import CardsChart from './data/CardsChart.jsx';


const Statistics = () => {
    const [sidebar, setSidebar] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [cards, setCards] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const handleSidebar = () => {
        setSidebar(!sidebar);
    }
    return (
        <Layout>
            <div className="w-full flex flex-row items-start justify-between gap-2">
                <div onClick={handleSidebar} className="w-auto hover:rounded-full cursor-pointer hover:bg-gray-100 p-4"><FaBarsStaggered size={25} /></div>
                <div className={`sidebar ${sidebar ? 'active' : ''}`}>
                    <Sidebar />
                </div>
                <div className="w-full flex flex-col items-center mx-auto gap-y-4">
                    <UsersChart />
                    <CardsChart />
                </div>
            </div>
        </Layout>
    )
}

export default Statistics