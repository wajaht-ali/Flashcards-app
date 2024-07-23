/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CardInfo = () => {
    const [cardData, setCardData] = useState({});
    const [subject, setSubject] = useState({});
    const [creator, setCreator] = useState({});

    const { id } = useParams();

    const fetchCard = async (id) => {
        try {
            const res = await axios.get(`/api/v1/cards/get-single-card/${id}`);
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
                setSubject(res.data.output);
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
        if (cardData) {
            fetchSubject(cardData.subject);
            fetchCreator(cardData.creator);
        }
    }, [cardData])
    return (
        <Layout>
            <div>
                <h1>Card Info</h1>
            </div>
        </Layout>
    )
}

export default CardInfo