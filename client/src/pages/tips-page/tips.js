import React, { useEffect, useState } from "react";
import { SideNav } from "../components/sidenav";
import { PageTitle } from "../components/page-title";
import "./tips-styles.css";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import RecommendIcon from '@mui/icons-material/Recommend';
import StarIcon from '@mui/icons-material/Star';
import { ViewTip } from "./view-tip";
import SearchIcon from '@mui/icons-material/Search';
// import pic1 from './vehicles.jpg';

export const Tips = () => {
    
    const [tips, setTips] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [id, setId] = useState(0);
    const [color, setColor] = useState("");
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState('');

    const [colors, ] = useState({
        "Water" : "rgba(14, 135, 204, 0.4)",
        "Electricity": "#809bce",
        "Vehicles": "#fc9dab",
        "Fuels" : "rgba(64, 145, 108, 0.8)",
        "Material Use": "#fc9dab",
    });
    const navigate = useNavigate();
    
    useEffect(() => {
        Axios.get("/get-tips").then((response) => {
           setTips(response.data);
        })
    },[])
    return (
        <>
        <div className="home">
            <SideNav />
            <PageTitle name="Actions"/>
            <div className="content">
                <div className="search-bar" style={{marginLeft: "5%"}}>
                    <SearchIcon className="search-icon"/>
                    <input style={{width: "255px"}} type='text' placeholder='Search by keyword or category...'
                        onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="actions">
                        {tips.filter((tip) => {
                            if(searchTerm.length>0){
                                if(tip.tip_title.toLowerCase().includes(searchTerm.toLowerCase()))
                                return tip
                                else if(tip.category_name.toLowerCase().includes(searchTerm.toLowerCase()))
                                return tip
                            }
                             else {return tip}
                        }).map((tip, key) => {
                            return (
                                <div className="action-card" style={{backgroundColor: colors[tip.category_name]}}
                                    onClick={() => {
                                        setOpenPopup(true)
                                        setId(tip.tip_id) 
                                        setColor(colors[tip.category_name])
                                        setTitle(tip.tip_title)
                                        setDesc(tip.tip_description)
                                        setCategory(tip.category_name)
                                     }}
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
                        
                        <ViewTip 
                            openPopup={openPopup}
                            setOpenPopup={setOpenPopup}
                            id={id}
                            title={title}
                            desc={desc}
                            category={category}
                            color={color}
                        />
                </div>
                
            </div>   
        </div>  
        </>
        
    );
}