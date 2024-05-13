/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import { MdOutlineEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { GoGlobe } from "react-icons/go";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    const footerNavs = [
        {
            label: "Company",
            items: [
                {
                    to: '#',
                    name: 'Partners'
                },
                {
                    to: '#',
                    name: 'Blog'
                },
                {
                    to: '#',
                    name: 'Team'
                },
                {
                    to: '#',
                    name: 'Careers'
                },
            ],
        },
        {
            label: "Resources",
            items: [
                {
                    to: '#',
                    name: 'contact'
                },
                {
                    to: '#',
                    name: 'Support'
                },
                {
                    to: '#',
                    name: 'Docs'
                },
                {
                    to: '#',
                    name: 'Pricing'
                },
            ],
        },
        {
            label: "About",
            items: [
                {
                    to: '#',
                    name: 'Terms'
                },
                {
                    to: '#',
                    name: 'License'
                },
                {
                    to: '#',
                    name: 'Privacy'
                },
                {
                    to: '#',
                    name: 'About US'
                },
            ]
        }
    ]
    return (
        <footer className="text-black bg-white px-4 py-5 w-full max-w-screen-xl mx-auto md:px-8">
            <div className="gap-6 justify-between md:flex">
                <div className="flex-1">
                    <div className="max-w-xs">
                        <img src="https://www.floatui.com/logo.svg" className="w-32" />
                        <p className="leading-relaxed mt-2 text-[15px] font-normal">
                            Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.
                        </p>
                    </div>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <label className="block pt-4 pb-2 font-normal">
                            Stay up to date
                        </label>
                        <div className="max-w-sm flex items-center border rounded-md p-1">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full p-2.5 outline-none"
                            />
                            <button
                                className="p-2.5 rounded-md text-white bg-indigo-600 outline-none shadow-md focus:shadow-none sm:px-5">
                                Subscribe
                            </button>
                        </div>
                    </form>
                </div>
                <div className="flex-1 mt-10 space-y-6 items-center justify-between sm:flex md:space-y-0 md:mt-0">
                    {
                        footerNavs.map((item, idx) => (
                            <ul
                                className="space-y-4"
                                key={idx}>
                                <h4 className="text-gray-800 font-medium">
                                    {item.label}
                                </h4>
                                {
                                    item.items.map(((el, idx) => (
                                        <li key={idx}>
                                            <Link
                                                to={el.href}
                                                className="hover:underline font-normal hover:text-indigo-600">
                                                {el.name}
                                            </Link>
                                        </li>
                                    )))
                                }
                            </ul>
                        ))
                    }
                </div>
            </div>
            <div className="mt-8 py-6 border-t font-normal items-center justify-between sm:flex">
                <div className="mt-4 sm:mt-0">
                    &copy; 2022 Float UI All rights reserved.
                </div>
                <div className="mt-6 sm:mt-0">
                    <ul className="flex items-center space-x-4">
                        <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                            <Link
                                to="https://wajahat-dev.vercel.app">
                                <GoGlobe />
                            </Link>
                        </li>

                        <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                            <Link to="https://linkedin.com/in/wajhat-ali/">
                                <FaLinkedin />
                            </Link>
                        </li>

                        <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                            <Link to="https://github.com/wajaht-ali/">
                                <FaGithub />
                            </Link>
                        </li>

                        <li className="w-10 h-10 border rounded-full flex items-center justify-center">
                            <abbr title="contact.chwajahat@gmail.com">
                                <Link to={"mailto:contact.chwajahat@gmail.com"}>
                                    <MdOutlineEmail />
                                </Link>
                            </abbr>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer