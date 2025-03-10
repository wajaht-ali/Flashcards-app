/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Spinner from '../Spinner';


export default function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    const API_KEY = import.meta.env.VITE_APP_API;

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(`${API_KEY}/api/v1/userAuth/admin-auth`);
            if (res.data.ok) {
                setOk(true)
            }
            else {
                setOk(false)
            }
        }
        if (auth?.token) authCheck()
    }, [auth, auth?.token])

    return ok ? <Outlet /> : <Spinner />
}