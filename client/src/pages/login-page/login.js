import React, { useContext, useState } from "react";
import { Navbar } from "../navbar";
import "./login-styles.css";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { AuthContext } from "../../context/Context";
import { Footer } from "../footer";
import image from "../../assets/images/pic1.jpg"
import { useForm } from "react-hook-form";
import { yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';

export const Login = () => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const {setAuthState} = useContext(AuthContext);

    const [error, setError] = useState("");

    const schema = yup.object().shape({
        email: yup.string().email("Please enter valid email").required("Please enter organization email"),
        password: yup.string().min(8, "Password must be atleast 8 characters").max(20).required("Please enter password"),
    });
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });

    const [ ,setCookies] = useCookies(["access_token"])
    const navigate = useNavigate();

    const login = async (event) => {
        // event.preventDefault();
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
            
        else setError(response.data.message);

    };

    return (
        <>
            <Navbar />
            
            <div className="login-page">
                <div className="login-pic">
                    <img src={image} alt="environment"/>
                </div>
                <div className="login"> 
                    <h2>Welcome back!</h2>
                    <form onSubmit={handleSubmit(login)}>
                        <div className="input-container">

                            <span className="error-msg">{errors.email?.message}</span>
                            <input placeholder="Email address" {...register("email")}
                            onChange={(event)=>{
                                setEmail(event.target.value);
                            }}/>

                            <span className="error-msg">{errors.password?.message}</span>
                            <input type="password" placeholder="Password" {...register("password")}
                                onChange={(event)=>{
                                setPassword(event.target.value);
                            }}
                            />
                
                            <button>Login</button>
                            <span className="error-msg" style={{margin: "auto", marginTop: "0px"}}>{error? error: null}</span>
                        </div>
                        <h4>No account yet? <Link to="/signup">Signup</Link></h4>
                    </form>
                </div>
            </div>
            <Footer />
            
        </>
    );
}