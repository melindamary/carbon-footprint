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
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const userid = JSON.parse(localStorage.getItem("user")).userid;

    const handleSubmit = () => {
        setOpenPopup(false);
    };

    useEffect(() => {
        console.log(id, userid)
        const fetchData = async () => {
        const response = await Axios.get(`/isCommit/${userid}&${id}`);
        
        if(response.data) setMessage(response.data.message);
        }
        fetchData();
        console.log("msg:",message);
    }, [id, message]);

    const handleCommit = (event) => {
        event.preventDefault();

        if(message === "not exists"){
            Axios.post('/commit-action', {

                tipid: id,
                userid: userid
            }).then(setMessage("exists"));
        }
        else if(message === "exists"){
            Axios.delete(`/delete-action/${userid}&${id}`).then(setMessage("not exists"));
        }
        
    }
    
   
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
                    <button className="commit-action-btn" onClick={handleCommit}>{message === "exists" ? "Uncommit Action" : "Commit Action!" }</button>
                </div> 
            </DialogContent>
            </Dialog>
        </>
        
    );
}