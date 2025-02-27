/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

import axios from "axios";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


const PromptsChart = () => {
    const [prompts, setPrompts] = useState([]);
    const API_KEY = import.meta.env.VITE_APP_API;
    
    const fetchGeminiData = async () => {
        try {
            const res = await axios.get(`${API_KEY}/api/v1/chat/get-prompts`);
            if (res.data.success) {
                setPrompts(res.data.output);
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error with prompts ${error}`)
        }
    }
    const countByMonth = (data) => {
        return data.reduce((acc, prompt) => {
            const month = new Date(prompt.createdAt).toLocaleString('default', { month: 'short' });
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, {});
    };

    const monthlyCounts = countByMonth(prompts);
    const chartData = Object.keys(monthlyCounts).map(month => ({ month, count: monthlyCounts[month] }));
    useEffect(() => {
        fetchGeminiData();
    }, [])

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart width={600} height={300} data={chartData} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart width={400} height={400}>
                    <Pie
                        data={chartData}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count">
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

export default PromptsChart;
