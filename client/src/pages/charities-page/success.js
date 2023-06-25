import React from 'react'
import "./donation-styles.css";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Axios from 'axios';

export const Success = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["donation"]);
  const [cookies2, setCookies2] = useCookies(["project"]);

  const userid = (JSON.parse(localStorage.getItem("user"))).userid;

  const handleSubmit = () => {
    const amount = cookies["donation"];
    const id = cookies2["project"];
    Axios.post("/add-transaction", {
      userid: userid,
      projectid: id,
      amount: amount,
    })
    setCookies("donation", "");
    setCookies2("project", "");
    navigate("/charities");
    
  }
  return (
    <div className='success'>
        <h2>Transaction successful.</h2>
        <p><b>Thank you for making a difference! </b></p>
        <button onClick={handleSubmit}>Click here to complete process</button>
    </div>
  )
}
