import React, { useEffect, useState } from "react";
import { SideNav } from "../components/sidenav";
import { PageTitle } from "../components/page-title";
import "./footprint-styles.css";
import { useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Axios from 'axios';

export const CategoryBusinessTrips = () => {
    const navigate = useNavigate();
    const [showNext, setShowNext] = useState(false);
    const [distance, setDistance] = useState(0);
    const [passengers, setPassengers] = useState(0);
    const [mode, setMode] = useState([]);
    const [haul, setHaul] = useState([]);
    const [type, setType] = useState([]);

    const userid = JSON.parse(localStorage.getItem("user")).userid;
    const show = () =>{
        setShowNext(!showNext)
    }

    useEffect(() => {
       
    }, [])
   
    const handleSubmit = () => {
        // show();
        // console.log(selectedVehicle, size, fuel, amount, mileage);
        // Axios.post("/add-vehicle-footprint", {
        //     userid: userid,
        //     vehicle: selectedVehicle,
        //     size: size,
        //     fuel: fuel,
        //     amount: amount,
        //     mileage: mileage,
        // })
        navigate("/display-footprint");
    }

    const handleChange = (event) => {
        console.log(event.target.value);
        // setSelectedVehicle(event.target.value);
    }
    const handleChange2 = (event) => {
        console.log(event.target.value);
        // setSize(event.target.value);
    }
    const handleChange3 = (event) => {
        console.log(event.target.value);
        // setFuel(event.target.value);
    }

    return (
        <>
        <div className="home">
            <SideNav />
            <PageTitle name="Your footprint"/>
            <div className="content">
                <div className="calculator-heading footprint-heading">
                     <button onClick={() => {navigate("/your-footprint")
                                            setShowNext(false)
                     }}><ArrowBackOutlinedIcon/></button>   
                </div>

                <div className="footprint-category-content">
                    <h3> Emissions From Business Travel</h3>
                    {
                        !showNext ?

                    <form className="calculator-form">
                    <label>Select Mode of Travel</label> <br />
                        <select onClick={handleChange}>
                            <option>--Select--</option>
                            {/* {vehicles.map((item, key) => {
                                return (
                                    <option key={key} value={item.type}>{item.type}</option>
                                )
                            })} */}
                        </select> <br />
                        <label>Select Haul</label> <br />
                        <select onClick={handleChange2} required>
                            <option>--Select--</option>
                            {/* {vehicleSizes.map((item, key) => {
                                return (
                                    <option key={key} value={item.size}>{item.size}</option>
                                )
                            })} */}
                        </select> <br />
                        <label>Select Type/Class</label> <br />
                        <select onClick={handleChange3} required>
                            <option>--Select--</option>
                            {/* {fuelTypes.map((item, key) => {
                                return (
                                    <option key={key} value={item.fuel}>{item.fuel}</option>
                                )
                            })} */}
                        </select> <br />

                        <button onClick={show}>Next</button>
                    </form>
                    :
                    <form className="calculator-form">
                        <label>Enter number of passengers</label> <br/>
                        <input type="number" required
                            onChange={(event) => setPassengers(event.target.value)}
                        /> <br/>

                        <label>Enter distance travelled (km)</label> <br/>
                        <input type="number" required
                            onChange={(event) => setDistance(event.target.value)}
                        /> <br/>

                        <div className="footprint-buttons">
                            <button onClick={show}>Back</button>
                            <button onClick={handleSubmit}>Calculate</button>
                        </div>
                        
                    </form>
                    }
                </div>   
            </div>
            
        </div>  
        </>
        
    );
}