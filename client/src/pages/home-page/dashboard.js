import React, { useEffect, useState } from "react";
import { SideNav } from "../components/sidenav";
import { PageTitle } from "../components/page-title";
import './dashboard-styles.css'
import Axios from 'axios';
import moment from 'moment';
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const userid = (JSON.parse(localStorage.getItem("user"))).userid;
    const username = (JSON.parse(localStorage.getItem("user"))).name;
    const [footprint, setFootprint] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get(`/categorywise-footprint/${userid}`).then((response) => {
            setFootprint(response.data.total);
        })
    }, [footprint]);

    return (
        <>
        <div className="home">
            <SideNav />
            <PageTitle name="Reports"/>
            
            <div className="content">
                <div className="overview">
                    {/* Overview */}
                </div>
                <div className="card-group">
                    <div className="usercard card1">
                        <span className="card-title">Total carbon footprint</span>
                        <span className="value">{footprint} <span className="desc"> kg CO2e</span> </span> 
                        
                    </div>
                    <div className="usercard card2">
                        <span className="card-title">Total carbon offset</span>
                        {/* <h2>Total carbon offset</h2> */}
                    </div>
                    <div className="usercard card3">
                        <span className="card-title">Offset projects supported</span>
                        <span className="value">1</span>  
                        <button className="card-button" onClick={() => {navigate("/my-donations")}}>View Donations</button>
                    </div>
                </div>
                
                
            </div>   
        </div>  
        </>
        
    );
}
