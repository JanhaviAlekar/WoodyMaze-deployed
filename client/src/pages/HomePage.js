import React from 'react';
import Layout from '../components/layout/layout';
import { Link } from 'react-router-dom';
import img1 from "../styles/home.jpg";

const HomePage = () => {
    return (
        <Layout title={"WoodyMaze"}>
            <section className="hero" id="home" style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container">
                    <div className="hero-content">
                        <p className="hero-subtitle">Fashion Everyday</p>
                        <h2 className="h1 hero-title">Unrivalled Fashion House</h2>
                        <Link to='/products'>
                            <button className="btn">Shop Now</button>
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default HomePage;
