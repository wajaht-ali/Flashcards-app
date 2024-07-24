/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { BiNotepad } from "react-icons/bi";
import axios from 'axios';
import { FcCalendar } from "react-icons/fc";
import { FcBusinesswoman, FcBusinessman } from "react-icons/fc";
import { Link } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import SearchInput from "../../SearchInput.jsx";
import { useSearch } from '../../../context/Search.jsx';
import Markdown from 'react-markdown';

const Search = () => {
    const [usersData, setUsersData] = useState([]);
    const [search, setSearch] = useSearch();


    const fetchUsersData = async () => {
        try {
            const res = await axios.get("/api/v1/userAuth/get-all-users");
            if (res.data.success) {
                setUsersData(res.data.users);
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with fetching users data ${error}`)
        }
    }

    useEffect(() => {
        fetchUsersData();
    }, [])

    const cardDataArray = search.results.map((card) => {
        const createdAtDate = new Date(card.createdAt);
        const formattedDate = createdAtDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Find the user data for the card creator
        const creatorData = usersData.find((user) => user.id === card.creator.id);

        return {
            title: card.title,
            id: card._id,
            content: card.content,
            createdAt: formattedDate,
            status: card.status,
            subject: card.subject,
            creator: {
                name: creatorData ? creatorData.name : 'Unknown',
                email: creatorData ? creatorData.email : 'Unknown',
                gender: creatorData ? creatorData.gender : 'Unknown',
            },
        };
    });

    return (
        <Layout>
            <div className="w-full flex flex-col items-start justify-between gap-2 mx-auto">
                <div className="w-full h-auto overflow-y-auto px-3 p-2 md:p-4 ">
                    <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />
                    <div className="w-auto my-2 flex items-center justify-center">
                        <SearchInput />
                    </div>
                    {search.results.length !== 0 ? <div className="text-lg mx-auto text-center">{search.results.length} result(s) found!</div> : <></>}
                    <div className="h-[80vh] mx-auto shadow rounded-lg md:p-2 shadow-gray-300 flex flex-col items-center justify-between">
                        <div className="mt-4 grid gap-14 md:grid-cols-4 md:gap-5">
                            {
                                cardDataArray.length === 0 ?
                                    <div className="h-auto w-full flex items-center justify-center mx-auto font-semibold text-lg">
                                        <p>No Content Found for <span className="text-blue-600">"{search.keyword}"</span>!</p>
                                    </div>
                                    :
                                    cardDataArray.map((items, index) => {
                                        return (
                                            <Link to={`/all-cards/card/${items.id}`} key={index}>
                                                <div className="rounded-xl bg-white p-3 text-center mx-4 md:mx-0 shadow-xl h-[200px] md:h-[250px] my-4">
                                                    <div
                                                        className="mx-auto flex h-16 w-16 -translate-y-8 transform items-center justify-center rounded-full bg-blue-400 shadow-lg shadow-teal-500/40 text-white">
                                                        <BiNotepad size={25} />
                                                    </div>
                                                    <h2 className="text-darken text-start mb-3 text-lg font-medium lg:px-6"><abbr className="no-underline" title={items.title}>
                                                        {items.title.substring(0, 30)}</abbr></h2>
                                                    <div className="flex flex-row items-center justify-around gap-x-2 my-2">
                                                        <span className="flex flex-row items-center gap-x-2">
                                                            <FcCalendar />
                                                            <p className="text-start text-[10px]">{items.createdAt}</p>
                                                        </span>
                                                        <span className="flex flex-row items-center gap-x-2">
                                                            {items.creator.gender === "Male" ? <FcBusinessman size={20} /> : <FcBusinesswoman size={20} />}
                                                            <p className="text-start text-[10px]">{items.creator.name}</p>
                                                        </span>
                                                    </div>
                                                    <p className="mt-3 text-sm text-start text-gray-400"><Markdown>{items.content.substring(0, 80)}</Markdown></p>
                                                </div>
                                            </Link>
                                        )
                                    })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search;