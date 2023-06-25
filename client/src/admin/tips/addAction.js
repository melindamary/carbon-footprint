import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Axios from 'axios';
import "../admin-styles.css";

export const AddAction = (props) => {
    const {addTipPopup, setAddTipPopup} = props;
    
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [desc, setDesc] = useState('')

    const [cat, setCat] = useState(["Electricity", "Water", "Vehicles"])

    const handleSubmit = (event) => {
        event.preventDefault();
        setAddTipPopup(false);
    }
    const add = (event) => {
        event.preventDefault();
        console.log(title, category, desc);
        Axios.post("add-tip", {
            title: title,
            category: category,
            desc: desc,
        }).then((response) => {
           
        })
        setAddTipPopup(false);
        
    }

  return (
    <div>
        <Dialog open={addTipPopup}>
            <DialogTitle style={{background:"#fff", textAlign: "center", color: "#2d6a4f"}}>
                Add Action
            </DialogTitle>
            <DialogContent dividers style={{background:"#fff"}}>

            
            <form onSubmit={add} className='inputs tips-form'>
                <label htmlFor="">Title</label>
                <input className="" type="text" required onChange={(event) => {
                    setTitle(event.target.value)
                }} />

                <label htmlFor="">Category</label>
                <select className='dropdown-field' onChange={(event) => setCategory(event.target.value)}>
                    <option>Select</option>
                    {cat.map((value, key) => {
                        return(
                            <option>{value}</option>
                        )
                    })}
                    
                </select>

                <label htmlFor="">Description</label>
                <textarea className="" type="text" required onChange={(event) => {
                    setDesc(event.target.value)
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
