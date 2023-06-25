import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
// import ClearIcon from '@mui/icons-material/Clear';
import Axios from 'axios';
import "../admin-styles.css";

export const Edit = (props) => {
    const {editTipPopup, setEditTipPopup, id} = props;

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        Axios.get(`/view-tip/${id}`).then((response) => {
        //    console.log(response.data[0]); 
           setTitle(response.data[0].tip_title)
           setDesc(response.data[0].tip_description)
           setCategory(response.data[0].category_name)
        })
    }, [id])
   
    const handleSubmit = (event) => {
        event.preventDefault();
        setEditTipPopup(false);
    }
    
    const update = (event) => {

        event.preventDefault();
    
        // console.log(title, category, desc);
        Axios.put("/update-tip", {
            title: title,
            category: category,
            desc: desc,
            id: id,
        })
        setEditTipPopup(false);
        
    }

  return (
    <div>
        <Dialog open={editTipPopup} >
            <DialogTitle style={{background:"#fff", textAlign: "center", color: "#2d6a4f"}}>
                Edit Action
            </DialogTitle>
            <DialogContent dividers style={{background:"#fff"}}>

            <form onSubmit={update} className='inputs tips-form'>
                <label htmlFor="title">Title</label>
                <input name="title" type="text" 
                    value={title} 
                    onChange={(e) => {setTitle(e.target.value)}} 
                />

                <label htmlFor="category">Category</label>
                <select className='dropdown-field' value={category} onChange={(e) => {setCategory(e.target.value)}} >
                    <option>{category}</option>

                </select> 

                <label htmlFor="description">Description:</label>
                <textarea name="description" type="text" required 
                    value={desc} 
                    onChange={(e) => {setDesc(e.target.value)}} 
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
