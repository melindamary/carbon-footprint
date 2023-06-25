import React from 'react'
import { useLocation } from 'react-router-dom'
import { SideNav } from "../components/sidenav";
import { PageTitle } from "../components/page-title";
import "./resources-style.css";
import { useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { DisplayPostComponent } from './displayPost';

export const ReadPost = () => {
    const location = useLocation();

  return (
    <>
        <div className="home">
            <SideNav />
            {/* <PageTitle name="Resources"/> */}
            <div className="content">
                <DisplayPostComponent id={location.state.id} navLocation={location.state.link}/>
            </div>   
        </div>  
        </>
    
  )
}
