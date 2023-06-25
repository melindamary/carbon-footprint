import React, { useEffect, useState } from 'react'
import { SideNav } from './sidenav.js'
import { PageTitle } from '../pages/components/page-title'
import Axios from 'axios';
import GroupIcon from '@mui/icons-material/Group';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PaymentsIcon from '@mui/icons-material/Payments';

export const AdminHome = () => {
  const [userCount, setUserCount] = useState(0);
  const [causeCount, setCauseCount] = useState(0);
  const [amountDonated, setAmountDonated] = useState(0);

  useEffect(() => {
    Axios.get("/admin-dashboard").then((response) => {
      setUserCount(response.data.userCount.userCount)
      setCauseCount(response.data.causes.causeCount)
      setAmountDonated(response.data.amount.amount)
    })
  },[])

  return (
    <>
        <div className="home">
            <SideNav/>
            <PageTitle name="Admin Dashboard"/>
            <div className="content">
            <div className="admin-dashboard">
              <div className='card card1' >
                <div className="header">
                  <h2>Total Users</h2> 
                  <span className="icon"><GroupIcon /></span>
                </div>
                <span className='value'>{userCount}</span> 
              </div>
              <div className='card card2'>
                <div className="header">
                  <h2>Total Causes Supported</h2>
                  <span className="icon"><VolunteerActivismIcon /></span>
                </div> 
                <span className='value'>{causeCount} </span>
                
              </div>
              <div className='card card3'>
                <div className="header">
                  <h2>Total Amount Donated</h2> 
                  <span className="icon"><PaymentsIcon /></span>
                </div>
                <span className='value'>₹{amountDonated} </span>
                
              </div>
            </div>
                
            </div>   
        </div>  
    </>
  )
}
