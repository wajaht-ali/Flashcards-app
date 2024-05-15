/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom';
import Layout from './Layout/Layout';

const Home = () => {
  return (
    <div>
      <Layout>
        <div className="bg-gray-900 h-screen grid place-items-center">
          <section className="mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
            <div className="space-y-4 py-4 flex-1 sm:text-center lg:text-left">
              <h1 className="text-white font-bold text-4xl xl:text-5xl">
                One page Template for
                <span className="text-indigo-400"> Digital agency</span>
              </h1>
              <p className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum
              </p>
              <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
                <Link to="javascript:void(0)" className="px-5 mx-2 py-3 text-white duration-150 bg-indigo-600 rounded-lg hover:bg-indigo-700 active:shadow-lg">
                  Get started
                </Link>
                <Link to="javascript:void(0)" className="px-5 mx-2 py-3 text-black duration-150 bg-white hover:text-black hover:bg-gray-200 rounded-lg active:shadow-lg">
                  Try it out
                </Link>
              </div>
            </div>
            {/* <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
              <img src="https://i.postimg.cc/HxHyt53c/undraw-heatmap-uyye.png" className="w-full mx-auto sm:w-10/12  lg:w-full" />
            </div> */}
          </section>
        </div>
      </Layout>
    </div>
  )
}

export default Home;