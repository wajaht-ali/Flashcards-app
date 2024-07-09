/* eslint-disable no-unused-vars */

import { useState } from 'react'
import logo from "../../assets/R__1_-removebg-preview.png";
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, } from "react-icons/fa";
import { useAuth } from '../../context/auth';
import Dropdown from '../Dropdown';

const Navbar = () => {
    const [state, setState] = useState(false)
    const [auth, setAuth] = useAuth();
    const navigation = [
        { title: "Cards", path: "/cards" },
        { title: "About", path: "/about-us" },
        { title: "Contact", path: "/contact-us" },
        { title: "Gemini", path: "/ask-gemini" }
    ]

    return (
        <nav className="bg-gray-900 border-b w-full md:static md:text-sm md:border-none">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between md:block">
                    <Link to="/">
                        <img
                            src={logo}
                            width={120}
                            height={40}
                            alt="Float UI logo"
                        />
                    </Link>
                    <div className="md:hidden left-10">
                        <button className="text-white"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (<FaTimes size={20} />) : (<FaBars size={20} />)
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                        {
                            navigation.map((item, idx) => {
                                return (
                                    <li key={idx} className="text-white text-[16px] hover:text-indigo-600">
                                        <Link to={item.path} className="block">
                                            {item.title}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                        <span className='hidden w-px h-6 bg-gray-300 md:block'></span>
                        <div className='space-y-3 items-center gap-x-6 md:flex md:space-y-0'>
                            {
                                auth.token ?
                                    (<ul>
                                        <li className="block text-center text-white">
                                            <Dropdown />
                                        </li>
                                    </ul>)
                                    :
                                    (<ul className='w-full flex flex-col md:flex-row items-center'>
                                        <li className='w-full'>
                                            <Link to="/login" className="w-full block m-2 p-3 text-center text-white hover:text-indigo-600 border rounded-lg md:border-none">
                                                Log in
                                            </Link>
                                        </li>
                                        <li className='w-full'>
                                            <Link to="/register" className="w-full block m-2 py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow">
                                                Sign up
                                            </Link>
                                        </li>
                                    </ul>)
                            }
                        </div>
                    </ul>
                </div >
            </div >
        </nav >
    )
}

export default Navbar;