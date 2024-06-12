/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Layout from '../../Layout/Layout'
import { useAuth } from '../../../context/auth'
import { FaBarsStaggered } from "react-icons/fa6";
import Sidebar from './Sidebar';

const Cards = () => {
    const [auth, setAuth] = useAuth();
    const [sidebar, setSidebar] = useState(false);

    const handleSidebar = () => {
        setSidebar(!sidebar);
    }

    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();

        } catch (error) {
            console.log(`Error with form submission ${error}`);
        }
    }
    return (
        <Layout>
            <div className="w-full flex flex-row items-start justify-between gap-2">
                <div onClick={handleSidebar} className="w-auto hover:rounded-full cursor-pointer hover:bg-gray-100 p-4"><FaBarsStaggered size={25} /></div>
                <div className={`sidebar ${sidebar ? 'active' : ''}`}>
                    <Sidebar />
                </div>
                <div className="w-full shadow-sm shadow-gray-200 h-screen overflow-y-auto p-4">
                    <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />

                    <div className="max-w-2xl mx-auto">
                        <h2 className="font-semibold text-xl md:text-2xl text-center my-3 text-indigo-700">Create a Card</h2>
                        <form onSubmit={handleFormSubmit}>

                        <button onClick={handleFormSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cards