/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import { useAuth } from '../../../context/auth'
import { FaBarsStaggered } from "react-icons/fa6";
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FcBusinesswoman, FcBusinessman } from "react-icons/fc";

const Users = () => {
    const [sidebar, setSidebar] = useState(false);
    const [users, setUsers] = useState([]);
    const API_KEY = import.meta.env.VITE_APP_API;

    const handleSidebar = () => {
        setSidebar(!sidebar);
    }
    const fetchUserData = async () => {
        try {
            const res = await axios.get(`${API_KEY}/api/v1/userAuth/get-all-users`);
            if (res.data.success) {
                setUsers(res.data.users);
            }
            else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with fetching users data ${error}`);
        }
    }
    useEffect(() => {
        fetchUserData();
    }, [])

    const handleDelete = async (id) => {
        try {
            const ans = prompt("Do you really want to delete this user?");
            if (ans === "YES" || ans === "yes") {
                const res = await axios.delete(`${API_KEY}/api/v1/userAuth/delete-user/${id}`);
                if (res.data.success) {
                    fetchUserData();
                    alert("User deleted successfully!");
                }
                else {
                    alert(res.data.message);
                }
            }
            else {
                alert("Please type 'YES' or 'yes' to delete, Retry!");
            }
        } catch (error) {
            console.log(`Error with deleting user ${error}`);
        }
    }
    const userDataArray = users.map((item) => {
        const createdAtDate = new Date(item.createdAt);
        const formattedDate = createdAtDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        });
        return {
            _id: item._id,
            name: item.name,
            email: item.email,
            role: item.role,
            gender: item.gender,
            sportName: item.answer,
            createdAt: formattedDate
        }
    })
    console.log(userDataArray)
    return (
        <Layout>
            <div className="w-full flex flex-row items-start justify-between gap-2">
                <div onClick={handleSidebar} className="w-auto hover:rounded-full cursor-pointer hover:bg-gray-100 p-4"><FaBarsStaggered size={25} /></div>
                <div className={`sidebar ${sidebar ? 'active' : ''}`}>
                    <Sidebar />
                </div>
                <div className="w-full shadow-sm shadow-gray-200 h-screen overflow-y-auto p-4">
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    S.No
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Member Since
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Sport Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Role
                                                </th>
                                                <th scope="col" className="relative px-6 py-3">
                                                    <span className="font-light text-sm">Action</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {userDataArray.map((person, index) => (
                                                <tr key={person._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                {person.gender === "Male" ? <FcBusinessman size={30} /> : <FcBusinesswoman size={30} />}
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                                                <div className="text-sm text-gray-500">{person.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.createdAt}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.sportName}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.role === 1 ? <>Admin</> : <>User</>}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                        <Link to={`/dashboard/admin/users/update-user/${person._id}`} className="bg-blue-600 px-2 py-1 text-white mx-1 rounded">
                                                            Update
                                                        </Link>
                                                        <button onClick={() => handleDelete(person._id)} className="bg-red-600 px-2 py-1 text-white mx-1 rounded">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users