import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
// import ClearIcon from '@mui/icons-material/Clear';
import Axios from 'axios';
import "../admin-styles.css";

export const EditEmission = (props) => {
    const {editEnergyPopup, setEditEnergyPopup, activity, emissionsProp, setEmissionsProp, emissionId} = props;

    // const [emissions, setEmissions] = useState(emissionsProp);

    useEffect(() => {
        
    }, []);
   
    const handleSubmit = (event) => {
        event.preventDefault();
        setEditEnergyPopup(false);
    }
    
    const update = (event) => {

        event.preventDefault();
        console.log(emissionId, emissionsProp);
        Axios.put("/update-emission-energy", {
            activityid: emissionId,
            emissions: emissionsProp,
        });
        setEditEnergyPopup(false);
        
    }

  return (
    <div>
        <Dialog open={editEnergyPopup} >
            <DialogTitle style={{background:"#fff", textAlign: "center", color: "#2d6a4f"}}>
                Edit Emissions/unit
            </DialogTitle>
            <DialogContent dividers style={{background:"#fff"}}>

            <form onSubmit={update} className='inputs tips-form'>
                <label htmlFor="title">{activity}</label>
                <input name="emissions" type="number" 
                    value={emissionsProp} 
                    onChange={(e) => {setEmissionsProp(e.target.value)}} 
                />

                {/* <label htmlFor="category">Category</label>
                <select className='dropdown-field' value={category}>
            

                </select> 

                <label htmlFor="description">Description:</label>
                <textarea name="description" type="text" required 
                    value={desc} 
                    onChange={(e) => {setDesc(e.target.value)}} 
                /> */}

                <div className='inputs-buttons'>
                    <button className='add-button'>Update</button>
                    <button className='cancel-button' onClick={handleSubmit}>Cancel</button>
                </div>
                
            </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}
