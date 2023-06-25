import React, { useEffect, useState } from "react";
import { SideNav } from "../components/sidenav";
import { PageTitle } from "../components/page-title";
import "./tips-styles.css";
import Axios from 'axios';
import moment from 'moment';
import { useLocation, useNavigate } from "react-router-dom";
import RecommendIcon from '@mui/icons-material/Recommend';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import pic1 from './vehicles.jpg';

export const ViewTip = () => {
    
    const [tip, setTip] = useState([]);
    const navigate = useNavigate();
    const id = useLocation().state.id;
    const bgcolor = useLocation().state.bgcolor;
    const title = useLocation().state.title;
    const category = useLocation().state.category;
    const desc = useLocation().state.desc;
    
    // useEffect(() => {
    //     Axios.get("get-tips").then((response) => {
    //        setTips(response.data);
    //     })
    // },[])
    return (
        <>
        <div className="home">
            <SideNav />
            <div className="content">
                <div className="view-tip-heading" style={{backgroundColor: bgcolor,}}>
                    <button className="tip-button" onClick={() => navigate("/tips")}><ArrowBackOutlinedIcon fontSize="small" /></button>
                    <h3>{title}</h3>
                    <span className="category-name" style={{width: "100px", marginLeft: "45.5%", marginTop:"10px"}}>{category}</span>
                </div>
                <p className="tip-desc">{desc}</p>
            </div>   
        </div>  
        </>
        
    );
}