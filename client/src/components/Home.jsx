/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom';
import Layout from './Layout/Layout';
import { useAuth } from '../context/auth';
import { FaGithub } from "react-icons/fa6";

const Home = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div>
      <Layout>
        <div className="bg-gray-900 h-screen grid place-items-center">
          <section className="mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex lg:flex-col lg:items-start md:px-8">

            {auth?.token ? (<div className='text-xl'>
              <h2 className="text-blue-700">Welcome back: <span className="text-white font-semibold">{auth?.user?.name}</span></h2>
            </div>) : (<></>)}

            <div className="space-y-4 py-4 flex-1 sm:text-center lg:text-left">
              <h1 className="text-white font-bold leading-6 text-4xl xl:text-5xl">
              Smart learning through interactive digital <br />
                <span className="text-indigo-400"> flashcard experience!</span>
              </h1>
              <p className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
              Discover smart learning through our interactive digital flashcards, enhanced by <span className="text-indigo-400 underline"> Google Gemini</span> for dynamic and engaging text generation.
              </p>
              <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
                <Link to="/dashboard" className="px-5 mx-2 py-3 text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700 active:shadow-lg">
                  Get started
                </Link>
                <Link target='_blank' to="https://github.com/wajaht-ali/Flashcards-app" className="px-5 mx-2 py-3 text-black duration-150 bg-white flex items-center gap-2 hover:text-black hover:bg-gray-200 rounded-lg active:shadow-lg w-[200px] text-md">
                  <FaGithub size={20}/>Star on GitHub
                </Link>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </div>
  )
}

export default Home;