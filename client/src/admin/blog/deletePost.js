import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
// import ClearIcon from '@mui/icons-material/Clear';
import Axios from 'axios';

export const DeletePost = (props) => {
    const {openPopup, setOpenPopup, id} = props;

    const handleSubmit = () => {
        setOpenPopup(false);
    }
    const deletePost = (event) => {
        event.preventDefault();
        Axios.delete(`/delete-post/${id}`).then((response) => {
            console.log(response);
            setOpenPopup(false);
        })
    }

  return (
    <div>
        <Dialog open={openPopup} style={{marginTop: "-100px"}}>
        <DialogTitle style={{background:"#EBEEEE", width: "300px", color: "rgba(0,0,0,0.7)" }}>
            Confirm delete
        </DialogTitle>
            <DialogContent dividers style={{background:"#EBEEEE"}}>
                <div style={{margin: "auto", width: "250px"}}>
                    <p>Are you sure you want to delete?</p>
                    <div className='deletePost'>
                        <button className="cancelbtn" onClick={handleSubmit}>Cancel</button>
                        <button className="delbtn" onClick={deletePost}>Delete</button>
                    </div>
                    
                </div>
            </DialogContent>
        </Dialog>
    </div>
  )
}
