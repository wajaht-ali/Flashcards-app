/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    })

    useEffect(() => {
        const fetchAuthData = async () => {
            
            const data = localStorage.getItem('cardAuth');
            if (data) {
                const parseData = JSON.parse(data);
                setAuth({
                    ...auth,
                    user: parseData.user,
                    token: parseData.token
                });
                console.log(parseData);
                axios.defaults.headers.common['Authorization'] = parseData.token;
            }
        };
        fetchAuthData();
    }, []);

    return <AuthContext.Provider value={[auth, setAuth]}>
        {children}
    </AuthContext.Provider>
}

//custom hook
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
