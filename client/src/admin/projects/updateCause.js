import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
// import ClearIcon from '@mui/icons-material/Clear';
import Axios from 'axios';
import "../admin-styles.css";

export const Edit = (props) => {
    const {editPopup, setEditPopup, id} = props;

    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [location, setLocation] = useState("");
    const [organization, setOrganization] = useState("");
    const [link, setLink] = useState("");
    const [doc, setDoc] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        Axios.get(`/view-cause/${id}`).then((response) => {
           console.log(response.data[0]); 
           setName(response.data[0].project_name)
           setAbout(response.data[0].project_description)
           setLocation(response.data[0].location)
           setOrganization(response.data[0].provider_organization)
           setLink(response.data[0].project_link)
           setDoc(response.data[0].documentation_link)
           setImage(response.data[0].image_url)
        })
    }, [id])
   
    const handleSubmit = () => {
        setEditPopup(false);
    }
    
    const update = (event) => {

        event.preventDefault();
    
        console.log(id, name, about, location, organization, link, doc, image);
        Axios.put("/update-cause", {
            name: name,
            summary: about,
            location: location,
            organization: organization,
            site: link,
            doc: doc,
            image: image,
            id: id,
        })
        setEditPopup(false);
        
    }

  return (
    <div>
        <Dialog open={editPopup} style={{width: "800px", margin: "auto", marginLeft: "400px"}}>
            <DialogTitle style={{background:"#fff", textAlign: "center", color: "#2d6a4f"}}>
                Edit Offset Project
            </DialogTitle>
            <DialogContent dividers style={{background:"#fff"}}>

            <form onSubmit={update} className='inputs'>
                <label htmlFor="name">Project Name:</label>
                <input name="name" type="text" 
                    value={name} 
                    onChange={(e) => {setName(e.target.value)}} 
                />

                <label htmlFor="about">About Project:</label>
                <textarea name="about" type="text" required 
                    value={about} 
                    onChange={(e) => {setAbout(e.target.value)}} 
                />

                <label htmlFor="location">Location:</label>
                <input name="location" type="text" required 
                    value={location} 
                    onChange={(e) => {setLocation(e.target.value)}} 
                />

                <label htmlFor="organization">Organization Name:</label>
                <input name="organization" type="text" required 
                    value={organization} 
                    onChange={(e) => {setOrganization(e.target.value)}} 
                />
                
                <label htmlFor="link">Project site link:</label>
                <input name="link" type="text" required 
                    value={link} 
                    onChange={(e) => {setLink(e.target.value)}} 
                />
                
                <label htmlFor="doc">Additional Documentation link:</label>
                <input name="doc" type="text" required 
                    value={doc} 
                    onChange={(e) => {setDoc(e.target.value)}} 
                />
                
                <label htmlFor="img">Image link:</label>
                <input name="img" type="text" required 
                    value={image} 
                    onChange={(e) => {setImage(e.target.value)}} 
                />

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
