/* eslint-disable no-unused-vars */
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchUserData = async (id) => {
    try {
      const res = await axios.get(`/api/v1/userAuth/get-user/${id}`);
      if (res.data.success) {
        console.log(res.data);
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        setAnswer(res.data.user.answer);
        setGender(res.data.user.gender);
      }
      else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(`Error with updating user data ${error}`)
    }
  }
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.put(`/api/v1/userAuth/update-user/${id}`, { name, email, password, answer, gender });
      if (res.data.success) {
        alert("User updated successfully!");
        navigate("/dashboard/admin/users");
      }
      else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(`Error with updateUser ${error}`);
    }
  }
  useEffect(() => {
    fetchUserData(id);
  }, [])
  return (
    <Layout>
      <main className="bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md md:w-full my-3">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Update User</h2>
          <form id="registrationForm" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Name</label>
              <input type="text" id="username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your username"
                onChange={(e) => setName(e.target.value)}
                required
                value={name} />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
              <input type="email" id="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
              <input type="password" id="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="mb-4">
              <label htmlFor="text" className="block text-gray-700 font-semibold mb-2">Favourite Sport</label>
              <input type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)} />
            </div>

            <div className="my-2">
              <label className="font-medium">
                Gender
              </label>
            </div>

            <div className="my-2 flex flex-row items-center justify-center gap-4">
              <label
                htmlFor="DeliveryStandard"
                className="mt-2 flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500">
                <div>
                  <p className="text-gray-700">Male</p>
                </div>

                <input
                  type="radio"
                  name="gender"
                  value="DeliveryStandard"
                  id="DeliveryStandard"
                  checked={gender === 'Male'}
                  onChange={() => setGender('Male')}
                  className="size-5 border-[2px] border-gray-300 text-blue-500" />
              </label>
              <label
                htmlFor="DeliveryPriority"
                className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500">
                <div>
                  <p className="text-gray-700">Female</p>
                </div>

                <input
                  type="radio"
                  name="gender"
                  value="DeliveryPriority"
                  id="DeliveryPriority"
                  checked={gender === 'Female'}
                  onChange={() => setGender('Female')}
                  className="size-5 border-gray-300 text-blue-500" />
              </label>
            </div>

            <button onClick={handleSubmit} type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 mt-4">Update</button>
          </form>
        </div>

      </main>
    </Layout>
  )
}

export default UpdateUser;