/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx"
const Layout = (props) => {
    return (
        <div>
            <Navbar />
            <main style={{ minHeight: '90vh' }}>
                {props.children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout