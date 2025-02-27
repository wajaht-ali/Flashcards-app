/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

let cardsCount, subjectCount = 0;
const CardsChart = () => {
    const [cardsData, setCardsData] = useState([]);
    const [subjData, setSubjData] = useState([]);
    const API_KEY = import.meta.env.VITE_APP_API;

    const fetchCardsData = async () => {
        try {
            const res = await axios.get(`${API_KEY}/api/v1/cards/all-cards`);
            if (res.data.success) {
                setCardsData(res.data.output);
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with cards ${error}`)
        }
    }
    const fetchSubjData = async () => {
        try {
            const res = await axios.get(`${API_KEY}/api/v1/subjects/get-all-subjects`);
            if (res.data.success) {
                setSubjData(res.data.output);
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with subject ${error}`)
        }
    }

    useEffect(() => {
        fetchCardsData();
    }, [])

    useEffect(() => {
        fetchSubjData();
    }, [])

    const cardsDataArray = cardsData.map((item) => {
        const subjArray = item.subject ? subjData.find((subj) => subj._id === item.subject) : null;
        return {
            title: item.title,
            id: item._id,
            content: item.content,
            status: item.status,
            subject: {
                name: subjArray ? subjArray.name : 'Unknown'
            },
        }
    })

    const subjectCounts = cardsDataArray.reduce((acc, card) => {
        const subjectName = card.subject.name;
        if (!acc[subjectName]) {
            acc[subjectName] = 0;
        }
        acc[subjectName]++;
        return acc;
    }, {});

    const chartData = Object.keys(subjectCounts).map((subject) => ({
        name: subject,
        count: subjectCounts[subject],
    }));

    // Colors for the pie chart
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    cardsCount = cardsData.length;
    subjectCount = subjData.length;

    return (
        <div className="w-full flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    className="text-[10px]"
                    width={600}
                    height={400}
                    data={chartData}
                    margin={{
                        top: 5, right: 30, left: 10, bottom: 50,
                    }} 
                    barSize={50}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={45} textAnchor="end" dx={80} dy={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8"/>
                </BarChart>
            </ResponsiveContainer>
            <h2 className="text-blue-600 text-2xl my-4">Cards Percentage Per Subject</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart width={600} height={400} className="text-[12px md:text[16px]" >
                    <Pie
                        data={chartData}
                        cx={300}
                        cy={200}
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="count" >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CardsChart;
