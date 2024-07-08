/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
    const [result, setResult] = useState([]);
    const fetchData = async () => {
        try {
            const res = await axios.get("/api/v1/chat/get-prompts");
            if (res.data.success) {
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
    return (
        <nav className="p-2 w-auto h-full border-r bg-white space-y-8 rounded-xl shadow-lg">
            <div className="flex flex-col items-start justify-normal">
                {
                    result.map((item, index) => {
                        return (
                            <Link to={`/chat/c/${item._id}`} key={index} className="flex flex-col">
                                <div className="flex flex-col items-start justify-center w-full h-12 px-4
                                bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200 hover:text-gray-
                                700 transition-all duration-300 ease-in-out cursor-pointer">
                                    <p className="text-sm font-semibold">{item.title}</p>
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