import React, { useState } from "react";
import './styles.css';
import { useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export const PageTitle = (props) => {
    const navigate = useNavigate();
    const [backButton, setBackButton] = useState(false);
    return (
        <>
            <div className="page-head">
                {backButton=== !props.back ?
                    <button className="back-button" onClick={() => {navigate(props.url)}}><ArrowBackOutlinedIcon/></button> 
                : null}   
                <h2>{props.name}</h2>
            </div>     
        </>
    );
}