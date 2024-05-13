/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, } from "react-icons/fa";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const handleNav = () => {
        setNav(!nav);
    }
    const handleClick = () => {
        setNav(!nav);
    }

    return (
        <div className='sticky top-0 w-full bg-black text-white flex flex-row items-center justify-between md:justify-around px-4 md:px-0 py-3 z-50'>
            <div className=''>
                <Link to={"/"} className='py-2 font-semibold text-md uppercase border-b-2 border-[#149EDC] transition-all'>Company</Link>
            </div>

            <div className="nav_items hidden md:block">
                <ul className='flex flex-row items-center'>
                    <li>
                        <Link className='border-[#149EDC] hover:border-b py-2 mx-4 font-semibold text-sm transition-all' to="/">Home</Link>
                    </li>
                    <li>
                        <Link className='border-[#FFD230] hover:border-b py-2 mx-4 font-semibold text-sm transition-all' to="/news">News</Link>
                    </li>
                    <li>
                        <Link className='border-[#FA6400] hover:border-b py-2 mx-4 font-semibold text-sm transition-all' to="/business">Business</Link>
                    </li>
                    <li>
                        <Link className='border-[#FF4C98] hover:border-b py-2 mx-4 font-semibold text-sm transition-all' to="/sports">Sports</Link>
                    </li>
                    <li>
                        <Link className='border-blue-400 hover:border-b py-2 mx-4 font-semibold text-sm transition-all' to="/world">World</Link>
                    </li>
                </ul>
            </div>

            {/* Mobile navbar */}
            <div className={!nav ? "hidden" : "nav_items absolute top-14 right-0  block md:hidden bg-black text-white w-full h-[190px] box-border z-50"}>
                <ul className='grid gap-5 my-3 grid-cols-2 place-items-center'>
                    <li>
                        <Link onClick={handleClick} className='active:border-blue-400 hover:border-b py-2 mx-4 font-semibold text-sm transition-all' to="/">Home</Link>
                    </li>
                    <li>
                        <Link onClick={handleClick} className='border-[#FFD230] hover:border-b py-2 mx-4 font-semibold text-sm transition-all' to="/news">News</Link>
                    </li>
                    <li>
                        <Link onClick={handleClick} className='border-[#149EDC] hover:border-b py-2 mx-4 font-semibold text-sm transition-all' to="/business">Business</Link>
                    </li>
                    <li>
                        <Link onClick={handleClick} className='border-blue-400 hover:border-b py-2 mx-4 font-semibold text-sm transition-all' to="/sports">Sports</Link>
                    </li>
                    <li>
                        <Link onClick={handleClick} className='border-blue-400 hover:border-b py-2 mx-4 font-semibold text-sm transition-all' to="/world">World</Link>
                    </li>
                </ul>
            </div>

            <div className="right flex flex-row items-center md:border-l-2 border-gray-800">
                <div className='sig_in mx-2 md:m-0'>
                    <div>
                    </div>
                </div>

                <div onClick={handleNav} className="p-3 mx-2 block md:hidden hamburger cursor-pointer">
                    {!nav ? <FaBars size={20} /> : <FaTimes size={20} />}
                </div>
            </div>

        </div>
    )
}

export default Navbar;