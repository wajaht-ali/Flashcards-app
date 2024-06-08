/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";

const Sidebar = () => {

    return (
        <nav className=" p-2 w-auto h-full border-r bg-white space-y-8">
            <div className="flex flex-col items-start justify-normal">
                <Link className="w-full font-semibold py-2 px-2 hover:bg-gray-200 hover:rounded-md" to={"/dashboard/admin/"}>Home</Link>
                <Link className="w-full font-semibold py-2 px-2 hover:bg-gray-200 hover:rounded-md" to={"/dashboard/admin/cards"}>Cards</Link>
                <Link className="w-full font-semibold py-2 px-2 hover:bg-gray-200 hover:rounded-md" to={"/dashboard/admin/users"}>Users</Link>
            </div>
        </nav>
    );
};

export default Sidebar;