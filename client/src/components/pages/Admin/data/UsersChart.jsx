/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LabelList } from 'recharts';

const UsersChart = () => {
  const [usersData, setUsersData] = useState([]);
  const sampleUsers = [
    { createdAt: '2024-05-17T08:49:08.628Z' },
    { createdAt: '2024-06-12T10:23:15.456Z' },
    { createdAt: '2024-06-12T10:23:15.456Z' },
    { createdAt: '2024-05-22T14:18:03.789Z' },
    { createdAt: '2024-05-22T14:18:03.789Z' },
  ];

  const fetchUserData = async () => {
    try {
      const res = await axios.get("/api/v1/userAuth/get-all-users");
      if (res.data.success) {
        setUsersData(res.data.users);
      } else {
        alert(res.data.message);
        // Use sample data if API call fails
        setUsersData(sampleUsers);
      }
    } catch (error) {
      console.log(`Error with fetching users data ${error}`);
      // Use sample data if API call fails
      setUsersData(sampleUsers);
    }
  };

  const getUserSignUpByMonth = (users) => {
    const userSignUpByMonth = {};
    users.forEach((user) => {
      const signupDate = new Date(user.createdAt);
      const monthName = signupDate.toLocaleDateString('en-US', { month: 'long' }); // Get full month name
      if (!userSignUpByMonth[monthName]) {
        userSignUpByMonth[monthName] = 0;
      }
      userSignUpByMonth[monthName]++;
    });
    return userSignUpByMonth;
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const userSignUpByMonth = getUserSignUpByMonth(usersData);
  const chartData = Object.entries(userSignUpByMonth).map(([monthName, count]) => ({
    name: monthName, // Use full month name for label
    count,
  }));

  const UserCountLabel = (props) => {
    const { x, y, value } = props;
    return (
      <text
        x={x + (20 / 2)} // Adjust x position for centering
        y={y - 10} // Adjust y position for placement above the bar
        dy={4} // Adjust text baseline
        textAnchor="middle"
        fill="#000"
      >
        {value}
      </text>
    );
  };

  return (
    <div className="w-full shadow-sm shadow-gray-200 overflow-y-auto p-4 -z-10">
      <BarChart
        width={700}
        height={300}
        data={chartData}
        margin={{ top: 5, right: 20, bottom: 30, left: 40 }}
      >
        <XAxis
          dataKey="name"
          tickLine={true}
          label={{ position: "bottom" }}
          tickFormatter={(value) => value} // Display the full value from "name"
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" barSize={30}>
          <LabelList dataKey="count" content={UserCountLabel} />
        </Bar>
      </BarChart>
    </div>
  );
};

export default UsersChart;
