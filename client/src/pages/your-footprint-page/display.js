import React, { useState, useEffect } from 'react'
import { SideNav } from "../components/sidenav";
import { PageTitle } from "../components/page-title";
import "./footprint-styles.css";
import { PieChart } from './pieChart';
import { DataGrid } from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import Axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

export const DisplayFootprint = () => {

    const userid = (JSON.parse(localStorage.getItem("user"))).userid;
    const [footprints, setFootprints] = useState([]);
    const [toggleState, setToggleState] = useState(1);
    const [fuelDetails, setFuelDetails] = useState([]);
    const [vehicleDetails, setVehicleDetails] = useState([]);
    const [materialDetails, setMaterialDetails] = useState([]);
    const [footprintTotal, setFootprintTotal] = useState(0);
    const toggle = (index) => {
        setToggleState(index);
    }

    useEffect(() => {
        Axios.get(`/categorywise-footprint2/${userid}`).then((response) => {
            console.log(response.data);
            setFootprints(response.data);
            Axios.get(`/fuel-details/${userid}`).then((response) => {
                setFuelDetails(response.data);
                Axios.get(`/vehicle-details/${userid}`).then((response) =>{
                    setVehicleDetails(response.data)
                    Axios.get(`/categorywise-footprint/${userid}`).then((response) => {
                        setFootprintTotal(response.data.total);
                        Axios.get(`/material-details/${userid}`).then((response) =>{
                            setMaterialDetails(response.data)
                        })
                    })
                })
            })
        })
        
        
    }, []);

    const columns1 = [
        {field: 'category_id', headerName: 'ID', width: 300},
        {field: 'category_name', headerName: 'Category', width: 300},
        {field: 'total', headerName: 'Footprint', width: 100},
        // {field: 'post_date', headerName: 'Created at', width: 220, renderCell: params=>moment(params.row.join_date).format('DD-MM-YYYY')},
    ];
    const columns_fuels = [
        {field: 'sno', headerName: 'S.No.', width: 130},
        {field: 'activity_item', headerName: 'Fuel', width: 150},
        {field: 'sum', headerName: 'Footprint', width: 150},

    ];
    const columns_vehicles = [
        {field: 'sno', headerName: 'S.No.', width: 80},
        {field: 'vehicle_type', headerName: 'Type', width: 120},
        {field: 'vehicle_size', headerName: 'Size', width: 120},
        {field: 'fuel_type', headerName: 'Fuel', width: 100},
        {field: 'sum', headerName: 'Footprint', width: 100},
    ];

    const columns_materials = [
        {field: 'sno', headerName: 'S.No.', width: 80},
        {field: 'item', headerName: 'Material', width: 120},
        {field: 'type', headerName: 'Type', width: 120},
        {field: 'sum', headerName: 'Footprint', width: 100},
    ];

    return (
        <>
            <div className="home">
                <SideNav />
                <PageTitle name="Footprint results"/>
                <div className="content">
                    <div className ='search-bar'> 
                        <SearchIcon style={{color: "#dedede", position: "relative", left: "30px", top: "3px"}}/>
                        <input type='text' placeholder='Search by Year'></input>
                    </div>
                    <div className='results'>
                        {/* <div className="charts" >
                            <PieChart />
                        </div>            */}
                        {/* <button className='results-button'>View Graphic Report</button> */}

                        <div className='table'>
                            <div className='tabs-footprint'>
                                <button 
                                    className={toggleState === 1? "active-tab-footprint" : "tab-button-footprint"}
                                    onClick={() => {toggle(1)}}
                                >Summary</button>
                                <button
                                    className={toggleState === 2? "active-tab-footprint" : "tab-button-footprint"}
                                    onClick={() => {toggle(2)}}
                                >Fuels</button>
                                <button
                                    className={toggleState === 3? "active-tab-footprint" : "tab-button-footprint"}
                                    onClick={() => {toggle(3)}}
                                >Vehicles</button>
                                <button
                                    className={toggleState === 4? "active-tab-footprint" : "tab-button-footprint"}
                                    onClick={() => {toggle(4)}}
                                >Material Usage</button>
                                <button
                                    className={toggleState === 5? "active-tab-footprint" : "tab-button-footprint"}
                                    onClick={() => {toggle(5)}}
                                >Business Trips</button>
                            </div>

                            <div>
                                {toggleState === 1 ?
                                <DataGrid
                                    sx={{
                                        "& .MuiDataGrid-columnHeaders": {
                                            backgroundColor: "#D8F3DC",
                                            color: "#1b4332",
                                            fontSize: 16
                                        },
                                    }}
                                    rows={footprints}
                                    getRowId={(row) => row.category_id}
                                    columns={columns1}
                                    checkboxSelection={false}
                                    disableRowSelectionOnClick={true}
                                    pagination={true}
                                    hideFooterPagination
                                    components={{
                                        Footer: () => {
                                            return(
                                                <Box sx={{ padding: "10px", display: "flex", borderTop: "1px solid #dedede" }}>
                                                    <span className='table-footer'>Total</span>
                                                    <span className='table-footer'>{footprintTotal}</span>
                                                </Box>
                                            )
                                        }

                                    }}
                                />
                                : <></> }
                                {toggleState === 2 ?
                                    <DataGrid
                                    sx={{
                                        "& .MuiDataGrid-columnHeaders": {
                                            backgroundColor: "#D8F3DC",
                                            color: "#1b4332",
                                            fontSize: 16
                                        },
                                    }}
                                    rows={fuelDetails}
                                    getRowId={(row) => row.activity_item}
                                    columns={columns_fuels}
                                    checkboxSelection={false}
                                    disableRowSelectionOnClick={true}
                                    pagination={true}
                                    hideFooterPagination
                                />
                                : <></> }

                                {toggleState === 3 ?
                                    <DataGrid
                                    sx={{
                                        "& .MuiDataGrid-columnHeaders": {
                                            backgroundColor: "#D8F3DC",
                                            color: "#1b4332",
                                            fontSize: 16
                                        },
                                    }}
                                    rows={vehicleDetails}
                                    getRowId={(row) => row.sno}
                                    columns={columns_vehicles}
                                    checkboxSelection={false}
                                    disableRowSelectionOnClick={true}
                                    pagination={true}
                                    hideFooterPagination
                                />
                                : <></> }

                                {toggleState === 4 ?
                                    <DataGrid
                                    sx={{
                                        "& .MuiDataGrid-columnHeaders": {
                                            backgroundColor: "#D8F3DC",
                                            color: "#1b4332",
                                            fontSize: 16
                                        },
                                    }}
                                    rows={materialDetails}
                                    getRowId={(row) => row.sno}
                                    columns={columns_materials}
                                    checkboxSelection={false}
                                    disableRowSelectionOnClick={true}
                                    pagination={true}
                                    hideFooterPagination
                                />
                                : <></> }


                            </div>
                            </div>   
                    </div>
                </div>
                
            </div>  
        </>
      )

}

