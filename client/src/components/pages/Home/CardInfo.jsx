/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FcCalendar } from "react-icons/fc";
import { FcBusinesswoman, FcBusinessman } from "react-icons/fc";
import { useParams } from 'react-router-dom';
import Layout from '../../Layout/Layout';

const CardInfo = () => {
    const [cardInfo, setCardInfo] = useState([]);
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


    useEffect(() => {
        fetchCardInfo(id);
    }, [id])
    return (
        <Layout>
            <div className="w-full flex flex-row items-start justify-between gap-2">
                <div className="w-full h-auto overflow-y-auto px-3 p-2 md:p-4 ">
                    <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />

                    <div className="h-[80vh] mx-auto shadow rounded-lg md:p-2 shadow-gray-300 flex flex-col items-center justify-between">
                        <div className="h-full w-full flex-col items-center p-3">
                            <p>{cardInfo.title}</p>
                            <p>{cardInfo.status}</p>
                            <p>{cardInfo.creator}</p>
                            <p>{cardInfo.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CardInfo;