import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Axios from 'axios';

export const Display = (props) => {
    const {openPopup, setOpenPopup, title, summary, imageLink,
        link, doclink, country, organization} = props;

    const handleSubmit = () => {
        setOpenPopup(false);
    }

  return (
    <div>
        <Dialog open={openPopup} >
            <DialogTitle style={{background:"#EBEEEE", textAlign: "center",}}>
            <div className='dialog-title'>
            {title} 
            <button className='close-button' onClick={handleSubmit}><ClearIcon style={{fontSize: "medium"}}/></button>
            </div>
            
            </DialogTitle>
            <DialogContent dividers style={{background:"#EBEEEE"}}>
                <div className="donation-page">
                    <div className="donation-image">
                        <img src={imageLink} alt={title}/>
                    </div>
                    <div>
                        <div>
                            <h3>Summary</h3>
                            {summary} <br />
                            <br /><b>Location:</b> {country}<br />
                            <br/> <b>Organization:</b> <a href="">{organization}</a> <br/>
                            <br/> <b>Resources</b>
                            <ul>
                                <li><a href={link}>Project Homepage</a></li>
                                <li><a href={doclink}>This project has provided additional documentation in a PDF file (projdoc.pdf).</a></li>
                            </ul>
                        </div>
                    </div>
                    
                </div> 
            </DialogContent>
        </Dialog>
    </div>
  )
}
