import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Axios from 'axios';
import "../admin-styles.css";

export const AddCause = (props) => {
    const {addPopup, setAddPopup} = props;
    const [name, setName] = useState('');
    const [summary, setSummary] = useState('');
    const [location, setLocation] = useState('');
    const [organization, setOrganization] = useState('');
    const [site, setSite] = useState('');
    const [doc, setDoc] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setAddPopup(false);
    }
    const add = (event) => {

        event.preventDefault();
        console.log(name);
        Axios.post("add-cause", {
            name: name,
            summary: summary,
            location: location,
            organization: organization,
            site: site,
            doc: doc,
            image: image,
        }).then((response) => {
           
        })
        setAddPopup(false);
        
    }

  return (
    <div>
        <Dialog open={addPopup} >
            <DialogTitle style={{background:"#fff", textAlign: "center", color: "#2d6a4f"}}>
                Add Offset Project
            </DialogTitle>
            <DialogContent dividers style={{background:"#fff"}}>

            <form onSubmit={add} className='inputs'>
                <label htmlFor="">Project Name:</label>
                <input className="" type="text" required onChange={(event) => {
                    setName(event.target.value)
                }} />

                <label htmlFor="">About Project:</label>
                <textarea className="" type="text" required onChange={(event) => {
                    setSummary(event.target.value)
                }} />

                <label htmlFor="">Location:</label>
                <input className="" type="text" required onChange={(event) => {
                    setLocation(event.target.value)
                }} />

                <label htmlFor="">Organization Name:</label>
                <input className="" type="text" required onChange={(event) => {
                    setOrganization(event.target.value)
                }} />
                
                <label htmlFor="">Project site link:</label>
                <input className="" type="text" required onChange={(event) => {
                    setSite(event.target.value)
                }} />
                
                <label htmlFor="">Additional Documentation link:</label>
                <input className="" type="text" required onChange={(event) => {
                    setDoc(event.target.value)
                }} />
                
                <label htmlFor="">Image link:</label>
                <input className="" type="text" required onChange={(event) => {
                    setImage(event.target.value)
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
