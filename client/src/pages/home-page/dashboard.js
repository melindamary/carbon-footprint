import React, { useEffect, useState } from "react";
import { SideNav } from "../components/sidenav";
import { PageTitle } from "../components/page-title";
import './dashboard-styles.css'
import Axios from 'axios';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { PieChart } from "../your-footprint-page/pieChart";

export const Home = () => {
    const userid = (JSON.parse(localStorage.getItem("user"))).userid;
    const username = (JSON.parse(localStorage.getItem("user"))).name;
    const [footprint, setFootprint] = useState(0);
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(0);
    const [actions, setActions] = useState(2);
    const navigate = useNavigate();

    useEffect(() => {
        //total footprint of user
        Axios.get(`/get-total-footprint/${userid}`).then((response) => {
            setFootprint(response.data.total);
            Axios.get(`/get-total-offset/${userid}`).then((response) => {
                setOffset(response.data.offset);
                setCount(response.data.count);
            })
        })
        
    }, [footprint]);

    return (
        <>
        <div className="home">
            <SideNav />
            <PageTitle name="Reports"/>
            
            <div className="content">
                <div className="card-group">
                    <div className="usercard color1">
                        <span className="card-title">Total carbon footprint</span>
                        <span className="value">{footprint} <span className="desc"> kg CO2e</span> </span> 
                        
                    </div>
                    <div className="usercard color4">
                        <span className="card-title">Total carbon offset</span>
                        <span className="value">{offset} <span className="desc"> kg CO2e</span> </span> 
                    </div>
                    <div className="usercard color2">
                        <span className="card-title">Offset projects supported</span>
                        <span className="value">{count}</span> 
                    </div>
                    <div className="usercard color3">
                        <span className="card-title">Total eco-actions taken</span>
                        <span className="value">{actions}</span> 
                    </div>
                </div>
                <div className="data-visualization">
                <h3><u>Footprint Data {new Date().getFullYear()}</u></h3>
                   <div style={{width: "550px", marginLeft: "25%", marginTop: "-5%"}}><PieChart /></div> 
                </div>
                
            </div>   
        </div>  
        </>
        
    );
}
