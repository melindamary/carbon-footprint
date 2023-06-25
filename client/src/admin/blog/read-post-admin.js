import React from 'react'
import { useLocation } from 'react-router-dom'
import { SideNav } from "../sidenav.js";
import { PageTitle } from "../../pages/components/page-title";
import { DisplayPostComponent } from './displayPost';

export const ReadPostAdmin = () => {
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
