import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <div className='home-header'>Welcome To My Estore</div>
            <Link className='home-btn' to="/product">Products</Link>
        </div>
    )
}

export default Home