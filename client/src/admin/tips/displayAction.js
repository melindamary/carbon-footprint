import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Axios from 'axios';

export const Display = (props) => {
    const {openPopup, setOpenPopup, title, desc } = props;

    const handleSubmit = () => {
        setOpenPopup(false);
    }

  return (
    <div>
        <Dialog open={openPopup} style={{top: "-150px"}}>
            <DialogTitle style={{background:"#fc9dab", color: "#fff", height: "25px", textAlign: "center"}}>
            <div className='dialog-title'>
            {title}
            <button className='tip-close-button' onClick={handleSubmit}><ClearIcon style={{fontSize: "large"}}/></button>
            </div>
            
            </DialogTitle>
            <DialogContent dividers style={{background:"#fff"}}>
                <div className="view-tip">
                    <div>
                        <div>
                            <p>{desc}</p>
                        </div>
                    </div>
                    
                </div> 
            </DialogContent>
        </Dialog>
    </div>
  )
}
