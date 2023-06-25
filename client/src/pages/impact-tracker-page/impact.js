import React from "react";
import { SideNav } from "../components/sidenav";
import { PageTitle } from "../components/page-title";

export const ImpactTracker = () => {
    return (
        <>
        <div className="home">
            <SideNav />
            <PageTitle name="Impact tracker"/>
            <div className="content">
                hello
            </div>   
        </div>  
        </>
        
    );
}