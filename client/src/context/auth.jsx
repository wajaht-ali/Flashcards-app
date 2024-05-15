/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  
  const fetchData = () => {
    try {
      const data = localStorage.getItem("auth");
      if (data) {
        const parseData = JSON.parse(data);
        setAuth({
          ...auth,
          user: parseData.user,
          token: parseData.token,
        });
      }
    } catch (error) {
      console.log(`Error with useAuth ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
//useAuth custom hook creation
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
