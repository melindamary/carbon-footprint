import React, { useEffect, useState } from "react";
import { SideNav } from "../components/sidenav";
import { PageTitle } from "../components/page-title";
import "./footprint-styles.css";
import { useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Axios from 'axios';

export const CategoryMaterials = () => {
    const navigate = useNavigate();
    const [selectedActivity, setSelectedActivity] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [materials, setMaterials] = useState([]);
    const [materialActivities, setMaterialActivities] = useState([]);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        Axios.get("/material-activity").then((response) => {
            setMaterialActivities(response.data);
        });
       
    }, [selectedActivity, selectedMaterial]);


    const handleChange = (event) => {   
        const activity = event.target.value;
        setSelectedActivity(event.target.value);
        console.log(activity);

        Axios.get(`/get-materials/${activity}`).then((response) => {
            setMaterials(response.data);
        })
    }

    const userid = JSON.parse(localStorage.getItem("user")).userid;

    const handleSubmit = (event) => {
        //calculate footprint, store in db 
        event.preventDefault();
        console.log(selectedActivity ,selectedMaterial);
        Axios.post("/add-material-footprint",{
            userid: userid,
            material_activity: selectedActivity,
            material: selectedMaterial,
            amount: amount,
        }).then((response) => {
            console.log("Successful");
        })
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
                    <h3>Emissions From Material Use </h3>

                    <form className="calculator-form">
                        <label>Select Activity</label> <br />
                        <select onChange={handleChange}>
                            <option>--Select--</option>
                            {materialActivities.map((activity, key) => {
                                return (
                                    <option key={key} value={activity.material_activity}>{activity.material_activity}</option>
                                )
                            })}
                        </select> <br />

                        <label>Select Material</label> <br />
                        <select onClick={(event) => setSelectedMaterial(event.target.value)}>
                            <option>--Select--</option>
                            {materials.map((material, key) => {
                                return (
                                    <option key={key} value={material.activity_item}>{material.activity_item}</option>
                                )
                            })}

                        </select> <br />

                        <label>Amount used in tonnes</label> <br />
                        <input type="number" name="units" required
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


