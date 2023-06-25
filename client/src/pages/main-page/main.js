import React from "react";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import "./landing-page-styles.css";
import pic1 from '../../assets/images/pic6.jpg'
import { useNavigate } from "react-router-dom";

export const Main = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <div className="landingPage">
                <div className="description">
                    
                    <p><span>BetterEarth</span> is designed to help organizations measure, track, and manage their carbon footprint 
                    effectively. By doing so, you can make informed decisions to minimize your environmental impact, 
                    contribute to a sustainable future, and even save costs along the way.</p>
                    <button onClick={() => navigate("/signup")}>Get Started</button>
                </div>
                <div className="image">
                    <img src={pic1}/>
                </div>
            </div>
            <Footer />
        </>
    );
}