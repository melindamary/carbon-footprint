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
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';


export const ViewTip = (props) => {
    
    const {openPopup, setOpenPopup, id, title, desc, color, category} = props;
    const handleSubmit = () => {
        setOpenPopup(false);
    }
    const [tip, setTip] = useState([]);
    const navigate = useNavigate();
   
    return (
        <>
            <Dialog open={openPopup} style={{marginTop:"-50px"}}>
                <DialogTitle style={{background:color, textAlign: "center",}}>
                <div style={{color: "white"}} >
                 {title}
                <button className='tip-close' onClick={handleSubmit}><ClearIcon style={{fontSize: "large", }}/></button>
                </div>

                </DialogTitle>
                <DialogContent dividers style={{background:"#EBEEEE"}}>
                <div className="donation-page tip-dialog-body">
                    <p> 
                        {desc}
                    </p>
                </div> 
            </DialogContent>
            </Dialog>
        </>
        
    );
}