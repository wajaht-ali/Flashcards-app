/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner.jsx';
import axios from 'axios';

export default function ProtectedRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    const API_KEY = import.meta.env.VITE_APP_API;

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(`${API_KEY}/api/v1/userAuth/user-Auth`);
            if (res.data.ok) {
                setOk(true);
            }
            else {
                setOk(false);
            }
        }
        if (auth?.token) authCheck();
    }, [auth, auth?.token])

    return ok ? <Outlet /> : <Spinner />
}