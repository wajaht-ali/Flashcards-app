/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FcCalendar } from "react-icons/fc";
import { FcBusinesswoman, FcBusinessman } from "react-icons/fc";
import { useParams } from 'react-router-dom';
import Layout from '../../Layout/Layout';

const CardInfo = () => {
    const [cardInfo, setCardInfo] = useState({});
    const [userInfo, setUserInfo] = useState({})
    const [subjectInfo, setSubjectInfo] = useState({})
    const { id } = useParams();

    const fetchCardInfo = async (id) => {
        try {
            const res = await axios.get(`/api/v1/cards/get-single-card/${id}`);
            if (res.data.success) {
                console.log(res.data);
                setCardInfo(res.data.card);
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with fetching cards data ${error}`)
        }
    }
    const fetchUser = async (id) => {
        try {
            const res = await axios.get(`/api/v1/userAuth/get-user/${id}`);
            if (res.data.success) {
                console.log(res.data);
                setUserInfo(res.data.user);
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with fetching user data ${error}`)
        }
    }
    const fetchSubject = async (id) => {
        try {
            const res = await axios.get(`/api/v1/subjects/get-subject/${id}`);
            if (res.data.success) {
                console.log(res.data);
                setSubjectInfo(res.data.subject);
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with fetching subject data ${error}`)
        }
    }

    useEffect(() => {
        fetchCardInfo(id);
    }, [id])
    const userId = cardInfo.creator;
    const subjId = cardInfo.subject;
    console.log(userId)
    // console.log(subjId)
    useEffect(() => {
        if(userId) {
            fetchUser(userId);
            fetchSubject(subjId);
        }
    }, [userId, subjId])

    const cardDataArray = cardInfo.map((card) => {
        const createdAtDate = new Date(card.createdAt);
        const formattedDate = createdAtDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return formattedDate;
    });

    return (
        <Layout>
            <div className="w-full flex flex-row items-start justify-between gap-2">
                <div className="w-full h-auto overflow-y-auto px-3 p-2 md:p-4 ">
                    <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />

                    <div className="h-[80vh] mx-auto shadow rounded-lg md:p-2 shadow-gray-300 flex flex-col items-center justify-between">
                        <div className="h-full w-full flex-col items-center p-3">
                            <p>{cardInfo.title}</p>
                            <p>{cardInfo.status}</p>
                            <p>{cardDataArray.createdAt}</p>
                            <p>{userInfo.name}</p>
                            <p>{subjectInfo.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CardInfo;