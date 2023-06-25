import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Axios from 'axios';
import "../admin-styles.css";

export const AddMaterial = (props) => {
    const {addMaterialPopup, setAddMaterialPopup} = props;
    const [name, setName] = useState('');
    const [activity, setActivity] = useState('');
    const [emissions, setEmissions] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setAddMaterialPopup(false);
    }
    const add = (event) => {

        event.preventDefault();
        Axios.post("/add-material", {
            name: name,
            activity: activity,
            emissions: emissions
        })
        setAddMaterialPopup(false);
        
    }

  return (
    <div>
        <Dialog open={addMaterialPopup}>
            <DialogTitle style={{background:"#fff", textAlign: "center", color: "#2d6a4f"}}>
                Add Material
            </DialogTitle>
            <DialogContent dividers style={{background:"#fff"}}>

            <form onSubmit={add} className='inputs category-fuel-form'>
                <label htmlFor="">Material name</label>
                <input className="" type="text" required onChange={(event) => {
                    setName(event.target.value)
                }} />

                <label htmlFor="">Activity in which material is used</label>
                <input className="" type="text" required onChange={(event) => {
                    setActivity(event.target.value)
                }} />

                <label htmlFor="">Emissions Per Unit</label>
                <input className="" type="text" required onChange={(event) => {
                    setEmissions(event.target.value)
                }} />

                <div className='inputs-buttons'>
                    <button className='add-button'>Add</button>
                    <button className='cancel-button' onClick={handleSubmit}>Cancel</button>
                </div>
            </form>
            </DialogContent>
        </Dialog>
    </div>
  )
}
