/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const data = [
    {
        _id: '668fd1d6ffcf20495260693d',
        title: 'Wajahat Ali - The Boss',
        status: 'Public',
        content: "Hii I'm Wajahat Ali. The Boss",
        creator: '66471a04f1d77d665342958a',
        subject: '668fca978feb9a334207df35',
        createdAt: '2024-07-11T12:36:38.161Z',
        updatedAt: '2024-07-11T12:36:38.161Z',
        __v: 0,
    },
    {
        _id: '669517e2deb78d8ef93e3a67',
        title: 'Arrays in computer science',
        status: 'Private',
        content: 'de, deserunt voluptatum doloribus sint voluptate ...',
        creator: '66471a04f1d77d665342958a',
        subject: '668fca978feb9a334207df35',
        createdAt: '2024-07-15T14:28:38.161Z',
        updatedAt: '2024-07-15T14:28:38.161Z',
        __v: 0,
    },
];

// Group data by subject
const subjects = {};
const statusCount = { Public: 0, Private: 0 };

data.forEach(card => {
    if (!subjects[card.subject]) {
        subjects[card.subject] = 0;
    }
    subjects[card.subject]++;
    statusCount[card.status]++;
});

const barChartData = Object.keys(subjects).map(subject => ({
    subject,
    count: subjects[subject],
}));

const pieChartData = [
    { name: 'Public', value: statusCount.Public },
    { name: 'Private', value: statusCount.Private },
];

const COLORS = ['#0088FE', '#00C49F'];

const CardsVisualization = () => {
    const [subjects, setSubjects] = useState([]);
    // subjects
    const fetchSubjectsData = async () => {
        try {
            const res = await axios.get("/api/v1/subjects/get-all-subjects");

            if (res.data.success) {
                setSubjects(res.data.output);
            }
            else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with fetching users data ${error}`);
        }
    }
    
    return (
        <div>
            <h2>Cards per Subject</h2>
            <BarChart width={600} height={300} data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>

            <h2>Cards Status Distribution</h2>
            <PieChart width={400} height={400}>
                <Pie
                    data={pieChartData}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    )
}

export default CardsVisualization;
