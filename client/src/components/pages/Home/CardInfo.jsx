/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FcBusinesswoman, FcBusinessman } from "react-icons/fc";
import Markdown from 'react-markdown';

const CardInfo = () => {
    const [cardData, setCardData] = useState({});
    const [subject, setSubject] = useState({});
    const [creator, setCreator] = useState({});

    const { id } = useParams();

    const fetchCard = async (id) => {
        try {
            const res = await axios.get(`/api/v1/cards/get-single-card/${id}`);
            console.log(res)
            if (res.data.success) {
                setCardData(res.data.card);
            }
            else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with fetching card: ${error}`)
        }
    }
    const fetchSubject = async (subjectId) => {
        try {
            const res = await axios.get(`/api/v1/subjects/get-subject/${subjectId}`);
            console.log(res)
            if (res.data.success) {
                setSubject(res.data.subject);
            }
            else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with fetching subject: ${error}`)
        }
    }
    const fetchCreator = async (creatorId) => {
        try {
            const res = await axios.get(`/api/v1/userAuth/get-user/${creatorId}`);
            console.log(res)
            if (res.data.success) {
                setCreator(res.data.user);
            }
            else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with fetching creator: ${error}`)
        }
    }
    useEffect(() => {
        fetchCard(id);
    }, [])

    useEffect(() => {
        if (cardData.creator) {
            fetchCreator(cardData.creator);
        }
        if (cardData.subject) {
            fetchSubject(cardData.subject);
        }
    }, [cardData])

    const createdAtDate = new Date(cardData.createdAt);
    const formattedDate = createdAtDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const updatedAtDate = new Date(cardData.updatedAt);
    const updatedDate = updatedAtDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    function calculateReadTimeInMinutes(text) {
        const wordsPerMinute = 120; // Average reading speed
        const words = text.split(/\s+/).length;
        const minutes = words / wordsPerMinute;
        return Math.ceil(minutes); // Round up to the nearest minute
    }
    const content = cardData?.content || "";
    const readTime = calculateReadTimeInMinutes(content);
    return (
        <Layout>
            <div className="max-w-2xl px-6 py-16 mx-auto space-y-12">
                <article className="space-y-8 text-black">
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">{cardData.title}</h1>
                        <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center text-gray-400">
                            <div className="flex items-center md:space-x-2">
                                <div className="w-5 h-5 border bg-yellow-300 text-blue-500 rounded-full m-auto">
                                    {creator.gender === "Male" ? <FcBusinessman /> : <FcBusinesswoman />}
                                </div>
                                <p className="text-sm"><span className="text-blue-600">Author: </span>{creator.name}</p>
                            </div>
                            <p className="flex-shrink-0 mt-3 text-sm md:mt-0"><span className="text-blue-600">Read Time: </span>{readTime} min read</p>
                        </div>
                        <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center text-gray-400">
                            <div className="flex items-center md:space-x-2">
                                <span className="text-blue-600">Posted on: </span> {formattedDate}
                            </div>
                            <p className="flex-shrink-0 mt-3 text-sm md:mt-0"><span className="text-blue-600">Updated On:</span> {updatedDate}</p>
                        </div>
                    </div>
                    <div className="border border-b border-dashed border-gray-300"></div>
                    <div className="text-gray-600">
                        <p><Markdown>{cardData.content}</Markdown></p>
                    </div>
                </article>
                <div>
                    <div className="flex flex-wrap py-6 gap-2 border-t border-dashed border-gray-400"></div>
                </div>
                <p className="text-sm">*Related cards feature is coming soon!!!</p>
            </div>
        </Layout>
    )
}

export default CardInfo