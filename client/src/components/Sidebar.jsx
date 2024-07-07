/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";

import { CgFileAdd } from "react-icons/cg";
import { ImStatsBars } from "react-icons/im";
import { RiHome5Line } from "react-icons/ri";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { PiCards } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";

const Sidebar = () => {

    return (
        <nav className="p-2 w-auto h-full border-r bg-white space-y-8 rounded-xl shadow-lg">
            <div className="flex flex-col items-start justify-normal">
                <Link className="w-full font-semibold py-4 px-2 hover:bg-gray-200 hover:text-blue-700 hover:rounded-md border-b border-b-gray-300" to={"/dashboard/admin/"}>
                    <div className="flex flex-row items-center gap-x-2"><RiHome5Line size={25} />Home</div>
                </Link>
                <Link className="w-full font-semibold py-4 px-2 hover:bg-gray-200 hover:text-blue-700 hover:rounded-md border-b border-b-gray-300" to={"/dashboard/admin/create-card"}>
                    <div className="flex flex-row items-center gap-x-2"><CgFileAdd size={25} />Create Card</div>
                </Link>
                <Link className="w-full font-semibold py-4 px-2 hover:bg-gray-200 hover:text-blue-700 hover:rounded-md border-b border-b-gray-300" to={"/dashboard/admin/all-cards"}>
                    <div className="flex flex-row items-center gap-x-2"><PiCards size={25} />All Cards</div>
                </Link>
                <Link className="w-full font-semibold py-4 px-2 hover:bg-gray-200 hover:text-blue-700 hover:rounded-md border-b border-b-gray-300" to={"/dashboard/admin/create-subject"}>
                    <div className="flex flex-row items-center gap-x-2"><HiOutlineFolderAdd size={25} /> Subject</div>
                </Link>
                <Link className="w-full font-semibold py-4 px-2 hover:bg-gray-200 hover:text-blue-700 hover:rounded-md border-b border-b-gray-300" to={"/dashboard/admin/users"}>
                    <div className="flex flex-row items-center gap-x-2"><FiUsers size={25} />Users</div>
                </Link>
                <Link className="w-full font-semibold py-4 px-2 hover:bg-gray-200 hover:text-blue-700 hover:rounded-md border-b border-b-gray-300" to={"/dashboard/admin/statistics"}>
                    <div className="flex flex-row items-center gap-x-2"><ImStatsBars size={25} />Statistics</div>
                </Link>
                
            </div>
        </nav>
    );
};

export default Sidebar;