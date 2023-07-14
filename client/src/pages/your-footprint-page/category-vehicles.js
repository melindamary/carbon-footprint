import React, { useEffect, useState } from "react";
import { SideNav } from "../components/sidenav";
import { PageTitle } from "../components/page-title";
import "./footprint-styles.css";
import { useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Axios from 'axios';

export const CategoryVehicles = () => {
    const navigate = useNavigate();
    const [showNext, setShowNext] = useState(false);
    const [mileage, setMileage] = useState(0);
    const [amount, setAmount] = useState(0);
    const [vehicles, setVehicles] = useState([]);
    const [vehicleSizes, setVehicleSizes] = useState([]);
    const [fuelTypes, setFuelTypes] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [size, setSize] = useState('');
    const [fuel, setFuel] = useState('');

    const userid = JSON.parse(localStorage.getItem("user")).userid;
    const show = () =>{
        setShowNext(!showNext)
    }

    useEffect(() => {
        Axios.get('/get-vehicles').then((response) => {
            setVehicles(response.data);
        })
        Axios.get('/get-vehicle-size').then((response) => {
            setVehicleSizes(response.data);
        })
        Axios.get('/get-fuel-type').then((response) => {
            setFuelTypes(response.data);
        })
        // setMileage(null)
        // setMileage(...mileage, numbers);
        // console.log(mileage)
    }, [selectedVehicle])
   
    const handleSubmit = () => {
        // show();
        console.log(selectedVehicle, size, fuel, amount, mileage);
        Axios.post("/add-vehicle-footprint", {
            userid: userid,
            vehicle: selectedVehicle,
            size: size,
            fuel: fuel,
            amount: amount,
            mileage: mileage,
        })
        navigate("/display-footprint");
    }

    const handleChange = (event) => {
        console.log(event.target.value);
        setSelectedVehicle(event.target.value);
    }
    const handleChange2 = (event) => {
        console.log(event.target.value);
        setSize(event.target.value);
    }
    const handleChange3 = (event) => {
        console.log(event.target.value);
        setFuel(event.target.value);
    }

    return (
        <>
        <div className="home">
            <SideNav />
            <PageTitle name="Your footprint" back={true} url="/your-footprint"/>
            <div className="content">
                <div className="footprint-category-content">
                    <h3> Emissions From Passenger and Delivery Vehicles</h3>

                    <form className="calculator-form" >

                    <div className="vehicle-inputs">
                        <label>Select vehicle:</label> 
                        <select onClick={handleChange}>
                            <option>Select</option>
                            {vehicles.map((item, key) => {
                                return (
                                    <option key={key} value={item.type}>{item.type}</option>
                                )
                            })}
                        </select> <br />
                    </div>
                    <div className="vehicle-inputs">
                        <label>Select vehicle size:</label> <br />
                        <select onClick={handleChange2} required>
                            <option>Select</option>
                            {vehicleSizes.map((item, key) => {
                                return (
                                    <option key={key} value={item.size}>{item.size}</option>
                                )
                            })}
                        </select> <br />
                    </div>

                    <div className="vehicle-inputs">
                        <label>Select fuel type:</label> <br />
                        <select onClick={handleChange3} required>
                            <option>Select</option>
                            {fuelTypes.map((item, key) => {
                                return (
                                    <option key={key} value={item.fuel}>{item.fuel}</option>
                                )
                            })}
                        </select> <br />
                    </div>
                        
                    <div className="vehicle-inputs">
                        <label>Enter number of vehicles:</label> <br/>
                        <input type="number" required style={{height: "25px"}}
                            onChange={(event) => setAmount(event.target.value)}
                        /> <br/>
                    </div>
                    
                    <div className="vehicle-inputs">
                        <label>Select average annual mileage (km):</label> <br/>
                        <input type="number" required style={{height: "25px"}}
                            onChange={(event) => setMileage(event.target.value)}
                        /> <br/>
                    </div>

                        <div className="footprint-buttons">
                            {/* <button onClick={show}>Back</button> */}
                            <button onClick={handleSubmit}>Calculate</button>
                        </div>
                        
                    </form>
                    
                </div>   
            </div>
            
        </div>  
        </>
        
    );
}