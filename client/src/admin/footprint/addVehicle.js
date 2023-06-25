import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Axios from 'axios';
import "../admin-styles.css";

export const AddVehicle = (props) => {
    const {addVehiclePopup, setAddVehiclePopup} = props;
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [size, setSize] = useState('');
    const [fuel, setFuel] = useState('');
    const [emissions, setEmissions] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setAddVehiclePopup(false);
    }
    const add = (event) => {

        event.preventDefault();
        Axios.post("/add-vehicle", {
            name: name,
            type: type,
            size: size,
            fuel: fuel,
            emissions: emissions,
        })
        setAddVehiclePopup(false);
        
    }

  return (
    <div>
        <Dialog open={addVehiclePopup}>
            <DialogTitle style={{background:"#fff", textAlign: "center", color: "#2d6a4f"}}>
                Add Vehicle
            </DialogTitle>
            <DialogContent dividers style={{background:"#fff"}}>

            <form onSubmit={add} className='inputs category-fuel-form'>
                <label htmlFor="">Vehicle name </label>
                <input className="" type="text" required onChange={(event) => {
                    setName(event.target.value)
                }} />

                <label htmlFor="">Vehicle type </label>
                <input className="" type="text" required onChange={(event) => {
                    setType(event.target.value)
                }} />

                <label htmlFor="">Vehicle size </label>
                <input className="" type="text" required onChange={(event) => {
                    setSize(event.target.value)
                }} />

                <label htmlFor="">Fuel type </label>
                <input className="" type="text" required onChange={(event) => {
                    setFuel(event.target.value)
                }} />

                <label htmlFor="">Emissions per unit</label>
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
