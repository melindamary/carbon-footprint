import React, { useState } from "react";
import { SideNav } from "../components/sidenav";
import { PageTitle } from "../components/page-title";
import "./footprint-styles.css";
import { useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Axios from 'axios';


export const CategoryElectricity = () => {
    const navigate = useNavigate();
    
    const [amount, setAmount] = useState(0);
    const [activity, setActivity] = useState('Electricity');

    const userid = JSON.parse(localStorage.getItem("user")).userid;

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // *calculate footprint, store in db
        Axios.post("/add-footprint", {
            userid: userid,
            activity: activity,
            amount: amount,
        }).then((response) => {
                if(response.data.message === null) {console.log("no")}
                else if(response.data.message) 
                console.log(response.data.message);
                
        });

        navigate("/display-footprint");    
        
    };

    return (
        <>
        <div className="home">
            <SideNav />
            <PageTitle name="Your footprint" back={true} url="/your-footprint"/>
            <div className="content">
                <div className="footprint-category-content">
                    <h3>Emissions From Energy Usage </h3>
                    <form className="calculator-form" onSubmit={handleSubmit}>
                        <label htmlFor="electricity-units">Enter electricity generated in kWh:</label> <br/>
                        <input type="number" name="electricity-units" required
                            onChange={(event) => {
                                setAmount(event.target.value);
                            }}
                        /> <br/>

                        <button type="submit">Calculate</button>
                    </form>
                </div>   
            </div>
            
        </div>  
        </>
        
    );
}