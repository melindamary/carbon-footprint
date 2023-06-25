import React from "react";
import { SideNav } from "../components/sidenav";
import { PageTitle } from "../components/page-title";
import "./footprint-styles.css";
import { useNavigate } from "react-router-dom";
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';
// import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import OfflineBoltOutlinedIcon from '@mui/icons-material/OfflineBoltOutlined';
import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined';
import LocalAirportOutlinedIcon from '@mui/icons-material/LocalAirportOutlined';
// import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import CommuteOutlinedIcon from '@mui/icons-material/CommuteOutlined';


export const Footprint = () => {
    const navigate = useNavigate();
    const username = (JSON.parse(localStorage.getItem("user"))).name;

    const Calculator = [
        {
            title: 'Electricity',
            icon: <OfflineBoltOutlinedIcon style={{fontSize: '30px'}}/>,
            link: '/category-electricity',
            
        },
        {
            title: 'Water Supply',
            icon: <WaterDropOutlinedIcon style={{fontSize: '30px'}}/>,
            link: '/category-water',
        },
        {
            title: 'Fuels',
            icon: <LocalGasStationOutlinedIcon style={{fontSize: '30px'}}/>,
            link: '/category-fuels',
            
        },
        {
            title: 'Vehicles',
            icon: <CommuteOutlinedIcon style={{fontSize: '30px'}}/>,
            link: '/category-vehicles',
            
        },
        {
            title: 'Material Use',
            icon: <ConstructionOutlinedIcon style={{fontSize: '30px'}}/>,
            link: '/category-materials',
            
        },
        {
            title: '',
            icon: '',
            link: '',
            
        },

        // {
        //     title: 'Business trips',
        //     icon: <LocalAirportOutlinedIcon style={{fontSize: '30px'}}/>,
        //     link: '/category-business-trips',
            
        // },
        

    ];
    return (
        <>
        <div className="home">
            <SideNav />
            <PageTitle name={"Welcome, "+ username }/>
            <div className="content">
                <div className="footprint-heading">
                     Select one of the options below to calculate   
                </div>
                <div className="footprint-content">
                    {Calculator.map((option,key) => {
                        return(
                            <button key={key} className="footprint-card-design" onClick={() => {
                                navigate(option.link)
                            }}>
                                <span>{option.icon}</span>
                                <div>{option.title}</div>
                            </button>
                        )
                    })}
                    
                </div>   
            </div>
            
        </div>  
        </>
        
    );
}