/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
// import { useAuth } from "../context/Auth.jsx";
// import { NavLink } from "react-router-dom";

const Sidebar = () => {
    // const [auth, setAuth] = useAuth();
    // const [result, setResult] = useState([]);
    // const id = auth?.user?._id;
    // const fetchPrompts = async (id) => {
    //     try {
    //         if (!id) {
    //             console.log("No id available");
    //             return;
    //         }
    //         else {
    //             const res = await axios.get(`/api/v1/ask/fetch-prompts/${id}`);
    //             if (res?.data?.success) {
    //                 setResult(res.data.prompts);
    //             }
    //             else {
    //                 alert(res.data.message);
    //             }
    //         }
    //     } catch (error) {
    //         console.log(`Error with prompts fetching ${error}`);
    //     }
    // }
    // useEffect(() => {
    //     fetchPrompts(id);
    // }, [id])

    return (
        <>
            <nav
                className=" p-2 w-auto h-full border-r bg-white space-y-8">
                <div className="flex flex-col h-full px-4">
                    
                    <div>
                        {/* {
                            result.map(item => (
                                <NavLink key={item._id} to={`/chat/c/${item._id}`}>
                                    <div className="my-1 hover:bg-gray-200 rounded-md py-2 font-poppins text-lg" >{item.title}</div>
                                </NavLink>
                            ))
                        } */}
                        <p className="bg-gray-300 text-black">This is Sidebar</p>
                    </div >
                </div>
            </nav>
        </>
    );
};

export default Sidebar;