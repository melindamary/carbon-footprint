import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
// import ClearIcon from '@mui/icons-material/Clear';
import Axios from 'axios';

export const DeleteEmission = (props) => {
    const {openDeletePopup, setDeletePopup, category, emissionId} = props;
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = () => {
        setErrorMsg('');
        setDeletePopup(false);
    };

    const deleteEmission = (event) => {
        event.preventDefault();
        setErrorMsg('');
        // console.log(category, emissionId);

        if(category === 'Electricity' || category === 'Water' || category === 'Fuels'){
            Axios.delete(`/delete-fuel/${emissionId}`).then((response) => {
                console.log(response.data);
                if(response.data === "Deletion not possible. User footprint associated with this category exists!"){ console.log("hi");setErrorMsg(response.data); }
                else { console.log("bye") ;setDeletePopup(false)};
            });
        }
        else if(category === 'Vehicles'){
            Axios.delete(`/delete-vehicle/${emissionId}`).then((response) => {
                console.log(response.data);
                if(response.data==="Deletion not possible. User footprint associated with this category exists!"){ setErrorMsg(response.data); }
                else setDeletePopup(false);
               
            });
        }
        else if(category === 'Material Use'){
            Axios.delete(`/delete-material/${emissionId}`).then((response) => {
                console.log(response.data);
                if(response.data==="Deletion not possible. User footprint associated with this category exists!"){ setErrorMsg(response.data); }
                else setDeletePopup(false);
            });
        }

        
    };

  return (
    <div>
        <Dialog open={openDeletePopup} style={{marginTop: "-100px"}}>
        <DialogTitle style={{background:"#EBEEEE", width: "300px", color: "rgba(0,0,0,0.7)" }}>
            Confirm delete
        </DialogTitle>
            <DialogContent dividers style={{background:"#EBEEEE"}}>
                <div style={{margin: "auto", width: "250px"}}>
                    <p>Are you sure you want to delete?</p>
                    <div className='deletePost'>
                        <button className="cancelbtn" onClick={handleSubmit}>Cancel</button>
                        <button className="delbtn" onClick={deleteEmission}>Delete</button>
                    </div>
                    <p className='delete-error-message'>{errorMsg}</p>
                    
                </div>
            </DialogContent>
        </Dialog>
    </div>
  )
}
