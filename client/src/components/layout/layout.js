import React from 'react'
import Header from './header'
import Footer from './footer'
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Toaster />
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: '75vh' }}>

                {children}
            </main>

            <Footer />
        </div >
    )
}
Layout.defaultProps = {
    title: "JANS STORE",
    description: "MERN PROJECT",
    keywords: " react, backend",
    author: "JANHAVI"
}
export default Layout