import React, { useEffect, useState } from "react";
import { SideNav } from "../components/sidenav";
import { PageTitle } from "../components/page-title";
import "./tips-styles.css";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import RecommendIcon from '@mui/icons-material/Recommend';
import StarIcon from '@mui/icons-material/Star';
// import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
// import pic1 from './vehicles.jpg';

export const Tips = () => {
    
    const [tips, setTips] = useState([]);
    const [colors, ] = useState({
        "Water" : "rgba(14, 135, 204, 0.4)",
        "Electricity": "#809bce",
        "Vehicles": "#fc9dab",
        "Fuels" : "rgba(64, 145, 108, 0.8)",
        "Material Use": "#fc9dab",
    });
    const navigate = useNavigate();
    
    useEffect(() => {
        Axios.get("get-tips").then((response) => {
           setTips(response.data);
        })
    },[])
    return (
        <>
        <div className="home">
            <SideNav />
            <PageTitle name="Actions"/>
            <div className="content">
                <div className="actions">
                        {tips.map((tip, key) => {
                            return (
                                <div className="action-card" style={{backgroundColor: colors[tip.category_name]}}
                                    onClick={() => navigate("/view-tip", {state:{
                                        id: tip.tip_id, 
                                        bgcolor: colors[tip.category_name],
                                        title: tip.tip_title,
                                        desc: tip.tip_description,
                                        category: tip.category_name
                                         }})}
                                >
                                    <h3>{tip.tip_title}</h3>
                                    <div className="card-footer">
                                        <div className="icon-group">
                                            <RecommendIcon fontSize="medium" className="icon"/>
                                            <span className="number">1</span>
                                        </div> 
                                        <div className="category-name">
                                            <span>{tip.category_name}</span>
                                        </div> 
                                        <div className="star-icon">
                                            <StarIcon fontSize="medium" />
                                        </div>   
                                    </div>
                                    
                                   
                                     
                                    
                                </div>
                            )
                        })}
                        
                                     
                </div>
                
            </div>   
        </div>  
        </>
        
    );
}