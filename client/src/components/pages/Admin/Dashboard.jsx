/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Layout from '../../Layout/Layout'
import { useAuth } from '../../../context/auth'
import { FaBarsStaggered } from "react-icons/fa6";
import Sidebar from './Sidebar';
import { FaPlus } from "react-icons/fa6";
import { CgFileAdd } from "react-icons/cg";
import { FiUsers } from "react-icons/fi";
import { ImStatsBars } from "react-icons/im";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  const [sidebar, setSidebar] = useState(false);

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
        <div className="w-full shadow-sm shadow-gray-200 h-screen overflow-y-auto p-4 flex flex-col items-start">
          <div>
            <h1 className='font-semibold text-lg md:text-3xl'>Welcome back, <span className="text-blue-700">Admin!</span></h1>
            <p>What&apos;s your plan for today?</p>
          </div>

          <div className="w-full flex flex-wrap items-center justify-around mt-20">
            <Link to={"/dashboard/admin/create-card"}>
              <div className="flex flex-col items-center justify-center shadow-lg h-[200px] w-[300px] rounded-lg p-4 transition-all hover:scale-90 cursor-pointer hover:shadow-lg my-2 md:my-0">
                <div className="w-auto table items-center p-4 bg-gray-200 rounded-full hover:bg-gray-300"><FaPlus size={25} /></div>
                <p className="mt-10 text-lg">Create Card</p>
              </div>
            </Link>
            <Link to={"/dashboard/admin/create-card"}>
              <div className="flex flex-col items-center justify-center shadow-lg h-[200px] w-[300px] rounded-lg p-4 transition-all hover:scale-90 cursor-pointer hover:shadow-lg my-2 md:my-0">
                <div className="w-auto table items-center p-4 bg-gray-200 rounded-full hover:bg-gray-300"><CgFileAdd size={25} /></div>
                <p className="mt-10 text-lg">Create Subject</p>
              </div>
            </Link>
            <Link to={"/dashboard/admin/create-card"}>
              <div className="flex flex-col items-center justify-center shadow-lg h-[200px] w-[300px] rounded-lg p-4 transition-all hover:scale-90 cursor-pointer hover:shadow-lg my-2 md:my-0">
                <div className="w-auto table items-center p-4 bg-gray-200 rounded-full hover:bg-gray-300"><FiUsers size={25} /></div>
                <p className="mt-10 text-lg">All Users</p>
              </div>
            </Link>
            <Link to={"/dashboard/admin/create-card"}>
              <div className="flex flex-col items-center justify-center shadow-lg h-[200px] w-[300px] rounded-lg p-4 transition-all hover:scale-90 cursor-pointer hover:shadow-lg my-2 md:my-0">
                <div className="w-auto table items-center p-4 bg-gray-200 rounded-full hover:bg-gray-300"><ImStatsBars size={25} /></div>
                <p className="mt-10 text-lg">Statistics</p>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Dashboard