import React, { useEffect, useState } from "react";
import { SideNav } from "../components/sidenav";
import { PageTitle } from "../components/page-title";
import "./footprint-styles.css";
import { useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Axios from 'axios';

export const CategoryFuels = () => {

    const navigate = useNavigate();
    const [fuels, setFuels] = useState([]);
    const [amount, setAmount] = useState(0);
    const [activity, setActivity] = useState('');
    const userid = JSON.parse(localStorage.getItem("user")).userid;

    useEffect(() => {
        Axios.get('/fuels').then((response) => {   //* to receive names of all fuels
            setFuels(response.data);
        })
    }, []);


    const handleSubmit = (event) => {
        //*calculate footprint, store in db 
        event.preventDefault();
        Axios.post("/add-footprint", {
            userid: userid,
            activity: activity,
            amount: amount,
        }).then((response) => {
                console.log(response.data.message);
                
        });
        navigate("/display-footprint");
    }

    return (
        <>
        <div className="home">
            <SideNav />
            <PageTitle name="Your footprint"/>
            <div className="content">
                <div className="calculator-heading footprint-heading">
                     <button onClick={() => {navigate("/your-footprint")}}><ArrowBackOutlinedIcon/></button>   
                </div>
                <div className="footprint-category-content">
                    <h3> Emissions From Primary Fuel Sources Combusted</h3>
                    <form className="calculator-form">
                        <label>Select fuel used</label> <br/>
                        <select 
                            onChange={(event) => setActivity(event.target.value)}>
                            <option>Select</option>
                            {fuels.map((fuel, key) => {
                                return ( 
                                    <option key={key}>{fuel.activity_item}</option>
                                    
                                )
                            })}
                        </select> <br />
                        <label>Amount used in Litres</label> <br />
                        <input type="number" name="fuel-units" required
                            onChange={(event) => setAmount(event.target.value)}
                        /> <br/>

                        <button onClick={handleSubmit}>Calculate</button>
                    </form>
                </div>   
            </div>
            
        </div>  
        </>
        
    );
}