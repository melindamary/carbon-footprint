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
  const [avgFootprint, setAvgFootprint] = useState(0);
  const [categoryCount, setCategoryCount] = useState(5);
  const [offsetAmount, setOffsetAmount] = useState(0);

  useEffect(() => {
    Axios.get("/admin-dashboard").then((response) => {
      setUserCount(response.data.userCount)
      setCauseCount(response.data.causes)
      setAmountDonated(response.data.amount)
      setOffsetAmount(response.data.offset)
      setAvgFootprint(response.data.avgFootprint)
      setCategoryCount(response.data.categoryCount)
    })

  },[])

  return (
    <>
        <div className="home">
            <SideNav/>
            <PageTitle name="Admin Dashboard"/>
            <div className="content">
              <div className="admin-dashboard">
                <div className='report-card palette1'>
                  <p>Organizations signed up</p>
                  <h1>{userCount}</h1>
                   
                </div>

                <div className='report-card palette2'>
                    <p>Average footprint of users</p>
                    <h1>{avgFootprint}
                      <span style={{fontSize: "18px"}}> kg CO2e</span></h1>
                    <span style={{fontSize: "18px",}}><i>(kg CO2 equivalent emissions)</i></span>  
                </div>

                <div className='report-card palette3'>
                   <div>
                      <p>Total causes supported</p>
                      <h1>{causeCount}</h1>
                    </div>
                    <div>
                      <p>Total amount donated</p>
                      <h1>₹{amountDonated}</h1>
                    </div>
                    <div>
                      <p>Total carbon offset</p>
                      <h1>{offsetAmount} <span style={{fontSize: "18px"}}> kg CO2e</span></h1>
                    </div>
                    <span className='note1'>
                      <h4>The carbon offset projects are in partnership with globalgiving.org</h4>
                      <i>*An amount of $2 is required to offset 1kg CO2e emissions.</i>
                    </span>
                </div>

                <div className='report-card palette4'>
                    <div>
                      <p>Total categories of footprint</p>
                      <h1>{categoryCount} </h1>
                    </div>
                    <div style={{width: "500px"}}>
                      <p style={{marginTop: "18px", fontSize: "17px", marginLeft: "-25%"}}>Emissions calculated from</p>
                      <ul>
                        <li>Electricity</li>
                        <li>Water</li>
                        <li>Fuels combusted</li>
                        <li>Materials used</li>
                        <li>Passenger and delivery vehicles</li>
                        <li>Business Trips</li>
                      </ul>
                    </div>
                    <span className='note2'>
                       <i>*The calculations adhere to the Greenhouse Gas (GHG) Protocol Corporate Accounting and Reporting Standard.</i>
                      </span>
                </div>

                {/* <div className='card color3'>
                  <div className="header">
                    <h2>Actions Committed</h2> 
                    <span className="icon"><PaymentsIcon /></span>
                  </div>
                  <span className='value'>{amountDonated} </span>
                  
                </div> */}
               
              </div> 
                
            </div>   
        </div>  
    </>
  )
}
