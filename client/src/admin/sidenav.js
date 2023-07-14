import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AuthContext } from "../context/Context";

//* -----ICONS----- //
import dashboard from "../assets/images/dashboard.png";
import footprint from "../assets/images/footprints.png";
import idea from "../assets/images/idea.png";
import heart from "../assets/images/heart.png";
import trophy from "../assets/images/trophy.png";
import book from '../assets/images/book.png';
import logoutIcon from "../assets/images/logout-icon.png";
import tree from "../assets/images/tree-logo.png";
import user from "../assets/images/user.png";
import money from "../assets/images/money.png";

import "./admin-styles.css";

export const SideNav = () => {
    
    const SidebarData = [
        {
            title: 'Dashboard',
            icon: dashboard,
            link: '/admin-home',
            alt: 'dashboard-icon'
        },
        {
            title: 'Users',
            icon: user,
            link: '/user-info',
            alt: 'dashboard-icon'
        },
        {
            title: 'Our Causes',
            icon: heart,
            link: '/causes',
            alt: 'charities-icon'
        },
        {
            title: 'Donations ',
            icon: money,
            link: '/donation-info',
            alt: 'donations'
        },
        {
            title: 'Categories',
            icon: footprint,
            link: '/categories',
            alt: 'categories',
        },
        {
            title: 'Tips',
            icon: idea,
            link: '/admin-tips',
            alt: 'tips',
        },
        // {
        //     title: 'Leaderboard',
        //     icon: trophy,
        //     link: '/admin-leaderboard',
        //     alt: 'leaderboard-icon'
        // },
        {
            title: 'Resources',
            icon: book,
            link: '/view-posts',
            alt: 'resources-icon',
        },
    ];


    const navigate = useNavigate();
    const [, setCookies] = useCookies(["access_token"]);
    const {authState, setAuthState} = useContext(AuthContext);

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("user");
        setAuthState(false);
        console.log(authState);
        navigate("/login");
    }
    return (
        <>
           <div className="sidebar">
                    <div className="logo">
                        <img className="tree-logo" src={tree} alt="logo" />
                    </div>
                    <ul id="admin-sidebar" className="sidebarList">
                        {SidebarData.map((val,key)=>{
                            return(
                                <NavLink to={val.link}>
                                    <li key={key} className="item">
                                    
                                    <img className="sidebar-icons" src={val.icon} alt={val.alt} /> <span className="title">{val.title}</span>
                                    </li>
                                </NavLink>
                            )
                        })}
                    </ul>
                    <div className="logout" onClick={logout}>
                        <Link><img src={logoutIcon} alt="logout-icon" /> Logout</Link>
                    </div>

                </div>
     
        </>
    );
}