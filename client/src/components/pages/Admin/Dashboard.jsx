/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Layout from '../../Layout/Layout'
import { useAuth } from '../../../context/auth'
import { FaBarsStaggered } from "react-icons/fa6";
import Sidebar from './Sidebar';

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
        <div className="w-full shadow-sm shadow-gray-200 h-screen overflow-y-auto p-4">Div 2</div>
      </div>
    </Layout>
  )
}

export default Dashboard