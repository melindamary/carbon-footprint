import React, { useEffect, useState } from "react";
import { SideNav } from "../sidenav";
import { PageTitle } from "../../pages/components/page-title";
import Axios from "axios";


export const OffsetProjectsList = () => {

    const [projects, setProjects] = useState([]);

    useEffect(()=>{
        Axios.get("https://api.globalgiving.org/api/public/projectservice/themes/climate/projects/active?api_key=29e181b0-5d16-4c2b-8426-aa7730421cfb").then(
            (response)=> {
           setProjects(response.data.projects.project);
           console.log(response.data.projects.project);
        })

        Axios.post("/causes", {
            projects: projects,
        })
    }, []);
    


    return (
        <>
        <div className="home">
            <SideNav />
            <PageTitle name="Carbon Offset Projects"/>
            <div className="content">
            
                                        
                
            </div>  
            
        </div>  
        </>
        
    );
}