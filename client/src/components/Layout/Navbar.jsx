/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import logo from "../assets/R__1_-removebg-preview.png";
// import { FaBars, FaTimes, FaUser, } from "react-icons/fa";

// const Navbar = () => {
//     const [nav, setNav] = useState(false);
//     const handleNav = () => {
//         setNav(!nav);
//     }
//     const handleClick = () => {
//         setNav(!nav);
//     }

//     return (
//         <div className='sticky top-0 w-full bg-black text-white flex flex-row items-center justify-between md:justify-around px-4 md:px-0 py-3 z-50'>
//             <div className=''>
//                 <Link to={"/"} className='py-2 font-semibold text-md uppercase border-b-2 border-[#149EDC] transition-all'>
//                     <img style={{height: "60px"}} src={logo} alt="LogoImage" />
//                 </Link>
//             </div>

//             <div className="nav_items hidden md:block">
//                 <ul className='flex flex-row items-center'>
//                     <li>
//                         <Link className='border-[#149EDC] hover:border-b py-2 mx-4 font-semibold text-sm transition-all' to="/">Home</Link>
//                     </li>
//                     <li>
//                         <Link className='border-[#FFD230] hover:border-b py-2 mx-4 font-semibold text-sm transition-all' to="/news">News</Link>
//                     </li>
//                     <li>
//                         <Link className='border-[#FA6400] hover:border-b py-2 mx-4 font-semibold text-sm transition-all' to="/business">Business</Link>
//                     </li>
//                     <li>
//                         <Link className='border-[#FF4C98] hover:border-b py-2 mx-4 font-semibold text-sm transition-all' to="/sports">Sports</Link>
//                     </li>
//                     <li>
//                         <Link className='border-blue-400 hover:border-b py-2 mx-4 font-semibold text-sm transition-all' to="/world">World</Link>
//                     </li>
//                 </ul>
//             </div>

//             {/* Mobile navbar */}
//             <div className={!nav ? "hidden" : "nav_items absolute top-14 right-0  block md:hidden bg-black text-white w-full h-[190px] box-border z-50"}>
//                 <ul className='grid gap-5 my-3 grid-cols-2 place-items-center'>
//                     <li>
//                         <Link onClick={handleClick} className='active:border-blue-400 hover:border-b py-2 mx-4 font-semibold text-sm transition-all' to="/">Home</Link>
//                     </li>
//                     <li>
//                         <Link onClick={handleClick} className='border-[#FFD230] hover:border-b py-2 mx-4 font-semibold text-sm transition-all' to="/news">News</Link>
//                     </li>
//                     <li>
//                         <Link onClick={handleClick} className='border-[#149EDC] hover:border-b py-2 mx-4 font-semibold text-sm transition-all' to="/business">Business</Link>
//                     </li>
//                     <li>
//                         <Link onClick={handleClick} className='border-blue-400 hover:border-b py-2 mx-4 font-semibold text-sm transition-all' to="/sports">Sports</Link>
//                     </li>
//                     <li>
//                         <Link onClick={handleClick} className='border-blue-400 hover:border-b py-2 mx-4 font-semibold text-sm transition-all' to="/world">World</Link>
//                     </li>
//                 </ul>
//             </div>

//             <div className="right flex flex-row items-center md:border-l-2 border-gray-800">
//                 <div className='sig_in mx-2 md:m-0'>
//                     <div>
//                     </div>
//                 </div>

//                 <div onClick={handleNav} className="p-3 mx-2 block md:hidden hamburger cursor-pointer">
//                     {!nav ? <FaBars size={20} /> : <FaTimes size={20} />}
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default Navbar;

import { useState } from 'react'
import logo from "../../assets/R__1_-removebg-preview.png";
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, } from "react-icons/fa";
import { useAuth } from '../../context/auth';
import Dropdown from '../Dropdown';

const Navbar = () => {
    const navigate = useNavigate();
    const [state, setState] = useState(false)
    const [auth, setAuth] = useAuth();
    const navigation = [
        { title: "Features", path: "javascript:void(0)" },
        { title: "Integrations", path: "javascript:void(0)" },
        { title: "Customers", path: "javascript:void(0)" },
        { title: "Pricing", path: "javascript:void(0)" }
    ]

    return (
        <nav className="bg-gray-900 border-b w-full md:static md:text-sm md:border-none">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <Link to="/">
                        <img
                            src={logo}
                            width={120}
                            height={50}
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
                                    <li key={idx} className="text-white hover:text-indigo-600">
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
                                auth?.token ?
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