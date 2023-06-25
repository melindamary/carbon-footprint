import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import "./donation-styles.css";
import ClearIcon from '@mui/icons-material/Clear';
import Axios from 'axios';
import { useCookies } from 'react-cookie';
// import { useNavigate } from 'react-router-dom';

export const Donation = (props) => {
    const {donationPopup, setDonationPopup, title, projectid} = props;
    // const navigate = useNavigate();
    const [amount, setAmount] = useState(0);
    const [isMessage, setIsMessage] = useState(false);
    const [, setCookies] = useCookies(["donation"]);
    const [, setCookies2] = useCookies(["project"]);

    const handleSubmit = () => {
        setDonationPopup(false);
    }
    const handleCheckout = async (event) => {
        event.preventDefault();
        console.log(amount);
        console.log(projectid);
        setCookies("donation", amount);
        setCookies2("project", projectid);
        if(amount>0) {
            const response = await Axios.post("/checkout-session", {
                amount: amount,
                title: title,
            });
            if(response.data.url)
                window.location.href = response.data.url;
        }
        else setIsMessage(true);
    }
  return (
    <div>
        <Dialog open={donationPopup}>
            <DialogTitle>
            <button className='close' onClick={handleSubmit}><ClearIcon style={{fontSize: "medium"}}/>  </button>
            </DialogTitle>
            <DialogContent>
                <p className='para banner'>{title}</p>
                <div className='heading'>Select Your Donation Amount</div>
                <div className='donation-amount-cards'>
                    <button className='donation-cards' onClick={()=>{setAmount(50)}}>₹50</button>
                    <button className='donation-cards' onClick={()=>{setAmount(100)}}>₹100</button>
                    <button className='donation-cards' onClick={()=>{setAmount(500)}}>₹500</button>
                    <button className='donation-cards' onClick={()=>{setAmount(1000)}}>₹1000</button>
                </div>
                <p className='para'>Or, Give any amount</p>
                <div className='para-input'>
                    <input type='text' name='donation-amount' placeholder='₹' 
                        onChange={(event) => { setAmount(event.target.value)}}/>
                    <button onClick={handleCheckout}>Proceed to checkout</button>
                    
                    {isMessage &&
                    <div className='message'>
                        <button onClick={() => {setIsMessage(false)}}>X</button>  Please choose an amount to proceed.
                    </div>}
                </div>
            </DialogContent>
                
        </Dialog>
    </div>
  )
}
