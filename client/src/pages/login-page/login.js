import React, { useContext, useState } from "react";
import { Navbar } from "../navbar";
import "./login-styles.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { AuthContext } from "../../context/Context";
import { Footer } from "../footer";
import image from "../../assets/images/pic1.jpg"


export const Login = () => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const {setAuthState} = useContext(AuthContext);

    const [ ,setCookies] = useCookies(["access_token"])
    const navigate = useNavigate();

    const login = async (event) => {
        event.preventDefault();
        const response = await Axios.post("/login",{
            email: email,
            password: password
        });
        if(!response.data.message){
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("user", JSON.stringify(response.data.details));
            setAuthState(true);
            // console.log(response.data);
            navigate("/select-user");
        }
            
        else console.log(response.data.message);

    };

    return (
        <>
            <Navbar />
            
            <div className="login-page">
                <div className="login-pic">
                    <img src={image} alt="environment picture"/>
                </div>
                <div className="login"> 
                    <h2>Welcome back!</h2>
                    <form onSubmit={login}>
                        <div className="input-container">
                            <input type="email" required placeholder="Email address" 
                            onChange={(event)=>{
                                setEmail(event.target.value);
                            }}/>

                            <input type="password" required placeholder="Password"
                                onChange={(event)=>{
                                setPassword(event.target.value);
                            }}
                            />
                
                            <button>Login</button>
                        </div>
                        <h4>No account yet? <Link to="/signup">Signup</Link></h4>
                    </form>
                </div>
            </div>
            <Footer />
            
        </>
    );
}