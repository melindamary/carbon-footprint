import React, { useEffect, useState } from 'react'
import "./footprint-styles.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);


export const PieChart = () => {

    const [electricity, setElectricity] = useState(0);
    const [water, setWater] = useState(0);
    const [fuels, setFuels] = useState(0);
    const [vehicles, setVehicles] = useState(0);
    const [material, setMaterial] = useState(0);
    const [trips, setTrips] = useState(0);
    const [totalFootprint, setTotalFootprint] = useState(0);
  
    const [category, setCategory] = useState([]);
    const userid = (JSON.parse(localStorage.getItem("user"))).userid;
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        Axios.get("/category").then((response) => {
          setCategory(response.data);
        })

        Axios.get(`/categorywise-footprint/${userid}&${year}`).then((response) => {
          // console.log(response.data);
          setElectricity(response.data.electricity);
          setWater(response.data.water);
          setFuels(response.data.fuels);
          setVehicles(response.data.vehicles);
          setMaterial(response.data.materials);
          console.log(electricity)
        })

        Axios.get(`/get-total-yearly-footprint/${userid}&${year}`).then((response) => {
          setTotalFootprint(response.data.total);
        })

    },[totalFootprint, electricity, water, fuels, vehicles, material]);

    let label = [];
    category.forEach(x => {
      label.push(x.category_name);
    })

    const data = {
        // labels: ['Electricity', 'Water Supply', 'Fuels', 'Vehicles', 'Material use', 'Business trips'],
        labels: label,
        datasets:[
          {
            title: 'Footprint Category',
            label: 'Footprint',
            data: [electricity, water, fuels, vehicles, material, trips],
            backgroundColor: [
              'rgba(125, 249, 255, 0.4)',
              'rgba(14, 135, 204, 0.4)',
              'rgba(230, 172, 39, 0.4)',
              'rgba(64, 145, 108, 0.4)',
              'rgba(205, 127, 50, 0.4)',
              'rgba(59, 72, 117, 0.4)',
            ],
            borderColor: [
              'rgba(125, 249, 255, 1)',
              'rgba(14, 135, 204, 1)',
              'rgba(230, 172, 39, 1)',
              'rgba(64, 145, 108, 1)',
              'rgba(205, 127, 50, 1)',
              'rgba(59, 72, 117, 1)',
            ],
            borderWidth: 1,
            hoverOffset: 10,
            cutout: 130,
            
          },
        ],
      };
      const options = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 14,
                    },
                    color: '#2d6a4f',
                    boxWidth: 20,
                    textAlign: 'left'
                },
                position: 'right',
                title: {
                    display: true,
                    text: 'Footprint Category',
                    position: 'center',
                    font: {
                        size: 14, 
                        weight: 'bold',
                    },
                    color: '#2d6a4f',
                    padding: 0
                }
        }
      },
      layout: {
        padding: {
          top: -300,
          left: 30,
          bottom: 50
        }
      },
      // animation: false,
    
    };


  return (
    <>
      <div className="pie">
      {totalFootprint === 0 ? 
      <p style={{marginTop: "100px", marginLeft: "16%"}}>Footprint data for current year not calculated.</p> :
      <>
      <div className="doughnut-center-text">Total kg CO2e<br/>{totalFootprint}</div>
         <Doughnut 
            data={data} 
            options={options} 
            // plugins={[textCenter]} 
            redraw
        />
      </>}
        
      </div>   
      
    </>
  )
}
