import React from "react";
import { Navbar } from "../navbar";
import "../login-page/login-styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from 'axios';
import { Footer } from "../footer";
import image from "../../assets/images/pic1.jpg"

export const Signup = () => {
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[organization, setOrganization] = useState("");
    const[country, setCountry] = useState("");
    const[password, setPassword] = useState("");

    const navigate = useNavigate();

    const signup = async (event) => {
        event.preventDefault();  //to prevent the page being redirected automatically
        const response = await Axios.post("/signup", {
            name: name,
            email: email,
            organization: organization,
            country: country,
            password: password,
        });
        console.log(response.data);
        if(response.data === "User has been created")
                navigate("/login");

        // console.log(name, email, organization, country, password);
    };
    
    return (
        <>
            <Navbar />
            <div className="login-page">
                <div className="signup-pic">
                    <img src={image} alt="environment picture"/>
                </div>
                <div className="signup"> 
                    <h2>Create your account</h2>
                    <form onSubmit = {signup}>
                        <div className="input-container">
                            <input type="text" required placeholder="Name" 
                                onChange={(event) =>{
                                    setName(event.target.value);
                                }}/>

                            <input type="email" required placeholder="Email address"
                                onChange={(event) =>{
                                    setEmail(event.target.value);
                                }}
                            />

                            <input type="text" required placeholder="Organization"
                                onChange={(event) =>{
                                    setOrganization(event.target.value);
                                }}
                            />

                            <input type="text" required placeholder="Country"
                                onChange={(event) =>{
                                    setCountry(event.target.value);
                                }}
                            />

                            <input type="password" required placeholder="Password"
                                onChange={(event) =>{
                                    setPassword(event.target.value);
                                }}
                            />

                            {/* <input type="password" required placeholder="Confirm Password"/> */}
                
                            <button>Sign Up</button>
                        </div>
                        <h4>Already a member? <Link to="/login">Login</Link></h4>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}