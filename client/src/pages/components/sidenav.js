import React, { useContext } from "react";
import './styles.css';
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AuthContext } from "../../context/Context";

//* -----ICONS----- //
import dashboard from "../../assets/images/dashboard.png";
import footprint from "../../assets/images/footprints.png";
import earth from "../../assets/images/earth.png"
import idea from "../../assets/images/idea.png";
import heart from "../../assets/images/heart.png";
import trophy from "../../assets/images/trophy.png";
import book from '../../assets/images/book.png';
import logoutIcon from "../../assets/images/logout-icon.png";
import tree from "../../assets/images/tree-logo.png"



export const SideNav = () => {
    
    const SidebarData = [
        {
            title: 'Calculate',
            icon: earth,
            link: '/your-footprint',
            alt: 'footprint-icon'
        },
        {
            title: 'Reports',
            icon: dashboard,
            link: '/home',
            alt: 'dashboard-icon'
        },
        {
            title: 'Footprint',
            icon: footprint,
            link: '/display-footprint',
            alt: 'impact-icon',
        },
        {
            title: 'Causes',
            icon: heart,
            link: '/charities',
            alt: 'charities-icon'
        },
        {
            title: 'Actions',
            icon: idea,
            link: '/tips',
            alt: 'tips',
        },
        // {
        //     title: 'Leaderboard',
        //     icon: trophy,
        //     link: '/leaderboard',
        //     alt: 'leaderboard-icon'
        // },
        {
            title: 'Resources',
            icon: book,
            link: '/resources',
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
                    <ul id="sidebar-nav" className="sidebarList">
                        {SidebarData.map((val,key)=>{
                            return(
                                <NavLink to={val.link}>
                                    <li key={key} className="list-item">
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