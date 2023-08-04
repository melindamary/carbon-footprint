import React from "react";
import { Navbar } from "../navbar";
import "../login-page/login-styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from 'axios';
import { Footer } from "../footer";
import image from "../../assets/images/pic1.jpg"
import { useForm } from "react-hook-form";
import { yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';


export const Signup = () => {
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    // const[organization, setOrganization] = useState("");
    const[location, setLocation] = useState("");
    const[password, setPassword] = useState("");
    const [error, setError] = useState("");

    const schema = yup.object().shape({
        name: yup.string().required("Organization name required").matches(/^[aA-zZ\s]+$/, "Name must include alphabets only"),
        email: yup.string().required("Organization email required").email("Please enter valid email. eg: abc@example.com").matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Please enter valid email. eg: abc@example.com"),
        location: yup.string().required("Location required"),
        password: yup.string().required("Password required").min(8, "Password must be atleast 8 characters").max(20),
        confirmPassword: yup.string().required("Please confirm password").oneOf([yup.ref("password"), null], "Passwords must match"),
    });
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate();

    const signup = async (event) => {
        // event.preventDefault();  //to prevent the page being redirected automatically
        const response = await Axios.post("/signup", {
            name: name,
            email: email,
            location: location,
            password: password,
        });
        setError(response.data);
        if(response.data === "User has been created")
                navigate("/login");

        console.log(name, email,location, password);
        // console.log(data.name);
    };
    
    
    return (
        <>
            <Navbar />
            <div className="login-page">
                <div className="signup-pic">
                    <img src={image} alt="environment"/>
                </div>
                <div className="signup"> 
                    <h2>Create your account</h2>

                    <form onSubmit = {handleSubmit(signup)}>
                        <div className="input-container">
                            <span className="error-msg">{errors.name?.message}</span>
                            <input type="text" placeholder="Organization name" {...register("name")}
                                onChange={(event) =>{
                                    setName(event.target.value);
                                }}/>
                            
                            <span className="error-msg">{errors.email?.message}</span>
                            <input placeholder="Email address" {...register("email")}
                                onChange={(event) =>{
                                    setEmail(event.target.value);
                                }}
                            />

                            <span className="error-msg">{errors.location?.message}</span>
                            <input type="text" placeholder="Location" {...register("location")}
                                onChange={(event) =>{
                                    setLocation(event.target.value);
                                }}
                            />
                            
                            <span className="error-msg">{errors.password?.message}</span>
                            <input type="password" placeholder="Password" {...register("password")}
                                onChange={(event) =>{
                                    setPassword(event.target.value);
                                }}
                            />

                            <span className="error-msg">{errors.confirmPassword?.message}</span>
                            <input type="password" placeholder="Confirm Password" {...register("confirmPassword")}/>

                            <button>Sign Up</button>
                            <span className="error-msg" style={{margin: "auto", marginTop: "0px"}}>{error? error: null}</span>
                        </div>
                        <h4>Already a member? <Link to="/login">Login</Link></h4>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}