/* eslint-disable no-unused-vars */
import React from 'react'
import Layout from '../../Layout/Layout'
import { useAuth } from '../../../context/auth'
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
        <div className="w-full flex flex-row items-center justify-between gap-4 p-4">
          <div className="w-[25%] border border-gray-500">Div 1</div>
          <div className="w-[70%] border border-gray-500">Div 2</div>
        </div>
    </Layout>
  )
}

export default Dashboard