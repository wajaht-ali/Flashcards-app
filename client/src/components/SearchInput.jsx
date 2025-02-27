/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios';
import { useSearch } from "../context/Search.jsx";
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const API_KEY = import.meta.env.VITE_APP_API;
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`${API_KEY}/api/v1/cards/search/${values.keyword}`);
            setValues({ ...values, results: res.data });
            navigate("/search");
        } catch (error) {
            console.log(`Error with search input ${error}`);
        }
    }
    return (

        <form onSubmit={handleSubmit} className="w-[500px] mx-auto">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <input type="search"
                    id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search cards with title..."
                    required
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })} />
                <button
                    onClick={handleSubmit}
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
            </div>
        </form>

    )
}

export default SearchInput