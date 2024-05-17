/* eslint-disable no-unused-vars */
import React from 'react'
import Layout from '../../Layout/Layout'
import { useAuth } from '../../../context/auth'

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
        <p>Name: {auth?.user?.name}</p>
        <p>Email: {auth?.user?.email}</p>
        <p>Gender: {auth?.user?.gender}</p>
        <p>Role: {auth?.user?.role === false ? "Visitor": "Admin"}</p>
    </Layout>
  )
}

export default Dashboard