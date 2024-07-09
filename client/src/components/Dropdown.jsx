/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useAuth } from "../context/auth";
import { FcBusinesswoman, FcBusinessman } from "react-icons/fc";

export default function Dropdown() {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const trigger = useRef(null);
    const dropdown = useRef(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });
    const handleLogout = () => {
        try {
            setAuth({
                ...auth,
                user: null,
                token: "",
            });
            localStorage.removeItem('cardAuth');
            navigate('/');
        } catch (error) {
            console.log(`Error with logging out ${error}`);
        }
    }
    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });

    return (
        <section className="py-3 text-black">
            <div className="container">
                <div className="flex justify-center">
                    <div className="relative inline-block">
                        <button
                            ref={trigger}
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="mb-3.5 md:mb-0 inline-flex items-center justify-center gap-2 rounded-lg border border-stroke  text-white px-6 py-2 text-base font-medium hover:bg-indigo-600 hover:text-white transition-all">
                            Profile
                            <span
                                className={`duration-100 ${dropdownOpen ? "-scale-y-100" : ""}`}>
                                <MdOutlineKeyboardArrowDown size={25} />
                            </span>
                        </button>
                        <div
                            ref={dropdown}
                            onFocus={() => setDropdownOpen(true)}
                            onBlur={() => setDropdownOpen(false)}
                            className={`absolute right-0 top-full w-[240px] divide-y divide-stroke overflow-hidden rounded-lg bg-white border border-gray-400 ${dropdownOpen ? "block" : "hidden"}`}>

                            <div className="flex items-center gap-3 px-4 py-3">
                                <div className="relative aspect-square w-10 rounded-full">
                                    {auth?.user?.gender === "Male" ? <FcBusinessman size={30} /> : <FcBusinesswoman size={30} />}
                                    <span className="absolute -right-0.5 -top-0.5 block h-3.5 w-3.5 rounded-full border-2 border-white bg-green"></span>
                                </div>
                                <div className="text-start">
                                    <p className="text-sm font-semibold">
                                        {auth?.user?.name}
                                    </p>
                                    <p className="text-sm text-body-color">
                                        {auth?.user?.email}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <Link
                                    to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}
                                    className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-dark hover:bg-gray-50">
                                    View profile
                                </Link>
                            </div>
                            <div>
                                <button onClick={handleLogout} className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-dark hover:bg-gray-50">
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}