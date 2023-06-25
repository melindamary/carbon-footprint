import React from "react";
import { SideNav } from "../components/sidenav";
import { PageTitle } from "../components/page-title";

export const Leaderboard = () => {
    return (
        <>
        <div className="home">
            <SideNav />
            <PageTitle name="Leaderboard"/>
            <div className="content">
                hello
            </div>   
        </div>  
        </>
        
    );
}