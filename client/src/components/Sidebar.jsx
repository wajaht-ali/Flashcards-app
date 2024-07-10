/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import { FcDeleteDatabase } from "react-icons/fc";

const Sidebar = () => {
    const [result, setResult] = useState([]);
    const fetchData = async () => {
        try {
            const res = await axios.get("/api/v1/chat/get-prompts");
            if (res.data.success) {
                // console.log(res.data);
                setResult(res.data.output);
            }
            else {
                alert("Error with prompts fetching!");
            }
        } catch (error) {
            console.log(`Error with fetching prompts: ${error}`);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const res = await axios.delete(`api/v1/chat/delete-chat/${id}`);
            if (res.data.success) {
                alert("Chat deleted successfully!");
                fetchData();
            }
            else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with deleting chat ${error}`);
        }
    }
    return (
        <nav className="p-2 w-auto h-full border-r bg-white space-y-8 rounded-xl shadow-lg">
            <div className="flex flex-col items-start justify-normal h-full overflow-y-scroll">
                <h1 className="text-lg md:text-2xl my-2 font-bold">Chats History</h1>
                {
                    result.length === 0 ?  
                    <div className="h-full w-full flex flex-col items-center justify-center gap-y-2">
                        <FcDeleteDatabase size={30} />
                        <p className="text-sm md:text-lg">No chats found!</p> 
                    </div>
                    :
                    result.map((item, index) => {
                        return (
                            <Link to={`/chat/c/${item._id}`} key={index} className="flex flex-col items-center w-full py-1">
                                <div className="flex flex-row items-center justify-between w-full h-10 px-4
                                bg-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-
                                700 transition-all duration-300 ease-in-out rounded-md cursor-pointer">
                                    <p className="text-sm font-semibold">{index + 1}. {item.title.substring(0, 16)}...</p>
                                    <button onClick={(event) => handleDelete(event, item._id)} className="hover:bg-white group rounded-full p-2">
                                        <FiTrash2 className="text-red-500 text-sm peer group-hover:text-red-700" />
                                    </button>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </nav>
    );
};

export default Sidebar;