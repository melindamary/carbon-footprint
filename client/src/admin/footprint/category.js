import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { SideNav } from '../sidenav.js'
import { PageTitle } from '../../pages/components/page-title'
import { DataGrid } from '@mui/x-data-grid';
// import moment from 'moment';
import './category-styles.css';
// import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { AddFuel } from './addFuel.js';
import { AddMaterial } from './addMaterial.js';
import { AddVehicle } from './addVehicle.js';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const Categories = () => {

    const [pageSize, setPageSize] = useState(5);
    const [emissions, setEmissions] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [materials, setMaterials] = useState([]);

    const [toggleState, setToggleState] = useState(1);
    const [addFuelPopup, setAddFuelPopup] = useState(false);
    const [addVehiclePopup, setAddVehiclePopup] = useState(false);
    const [addMaterialPopup, setAddMaterialPopup] = useState(false);

    const toggle = (index) => {
        setToggleState(index);
        console.log(toggleState);
    }
    useEffect(() => {
        async function fetchData() {
            const emissionsResponse = await Axios.get("/emissions-info");
            setEmissions(emissionsResponse.data);

            const vehiclesResponse = await Axios.get("/vehicles-info");
            setVehicles(vehiclesResponse.data);

            const materialsResponse = await Axios.get("/materials-info");
            setMaterials(materialsResponse.data);
        }
        fetchData();


    }, [emissions, vehicles, materials]);

    const deleteFuel = (id) => {
        // console.log(id);
        Axios.delete(`/delete-fuel/${id}`);
    }
    const deleteVehicle = (id) => {
        // console.log(id);
        Axios.delete(`/delete-vehicle/${id}`);
    }
    const deleteMaterial = (id) => {
        // console.log(id);
        Axios.delete(`/delete-material/${id}`);
    }


    const columns1 = [
        {field: 'sno', headerName: 'S.No.', width: 150},
        {field: 'activity', headerName: 'Activity', width: 200},
        {field: 'category', headerName: 'Category', width: 200},
        {field: 'emissions', headerName: 'Emissions/unit', width: 220,},
        {field: 'actions1', headerName:'Edit', width:100, renderCell: (params)=>{
            return(
                <>
                <button className='edit-button'
                    onClick={(event) => {
                        // setEditPopup(true)
                        
                    }}><EditIcon /></button>
                </>
            )
        }},
        {field: 'actions2', headerName:'Delete', width:100, renderCell: (params)=>{
            return(
                <>
                <button className='delete-button'
                    onClick={(event) => {
                        // console.log(params.row.activity_id);
                        deleteFuel(params.row.activity_id);
                    }}
                ><DeleteIcon /></button>
                </>
            )
        }},
    ];

    const columns2 = [
        {field: 'sno', headerName: 'S.No.', width: 120},
        {field: 'activity', headerName: 'Activity', width: 150},
        {field: 'vehicle_type', headerName: 'Type', width: 120},
        {field: 'size', headerName: 'Vehicle Size', width: 160},
        {field: 'fuel', headerName: 'Fuel', width: 130},
        {field: 'emissions', headerName: 'Emissions/unit', width: 160,},
        {field: 'actions1', headerName:'Edit', width:70, renderCell: (params)=>{
            return(
                <>
                <button className='edit-button'
                    onClick={(event) => {
                        // setEditPopup(true)
                        
                    }}><EditIcon /></button>
                </>
            )
        }},
        {field: 'actions2', headerName:'Delete', width:70, renderCell: (params)=>{
            return(
                <>
                <button className='delete-button'
                    onClick={(event) => {
                        deleteVehicle(params.row.activity_id);
                    }}
                ><DeleteIcon /></button>
                </>
            )
        }},
    ];

    const columns3 = [
        {field: 'sno', headerName: 'S.No.', width: 150},
        {field: 'activity', headerName: 'Activity', width: 200},
        {field: 'type', headerName: 'Type', width: 200},
        {field: 'emissions', headerName: 'Emissions/unit', width: 220,},
        {field: 'actions1', headerName:'Edit', width:100, renderCell: (params)=>{
            return(
                <>
                <button className='edit-button'
                    onClick={(event) => {
                        // setEditPopup(true)
                        
                    }}><EditIcon /></button>
                </>
            )
        }},
        {field: 'actions2', headerName:'Delete', width:100, renderCell: (params)=>{
            return(
                <>
                <button className='delete-button'
                    onClick={(event) => {
                        deleteMaterial(params.row.activity_id);
                    }}
                ><DeleteIcon /></button>
                </>
            )
        }},
    ];
    
  return (
    <>
        <div className="home">
            <SideNav/>
            <PageTitle name="Footprint Categories"/>
            <div className="content">
                <div className='category-buttons'>
                    <button onClick={() => setAddFuelPopup(true)}>Add Fuel </button>
                    <button onClick={() => setAddVehiclePopup(true)}>Add Vehicle </button>
                    <button onClick={() => setAddMaterialPopup(true)}>Add Material </button>
                </div>
                <div className="tabs category-tabs">
                    <button className={toggleState === 1 ? "active-tab" : "tab-button"} onClick={() => toggle(1)}>Energy</button>
                    <button className={toggleState === 2 ? "active-tab" : "tab-button"} onClick={() => toggle(2)}>Vehicles</button>
                    <button className={toggleState === 3 ? "active-tab" : "tab-button"} onClick={() => toggle(3)}>Material Use</button>
                    {/* <button className={toggleState === 4 ? "active-tab" : "tab-button"} onClick={() => toggle(4)}></button> */}
                </div>
                 <div style={{width: "80%",margin: "auto", height: "500px", justifyContent:'center',}}>
                 {toggleState === 1? 
                    <DataGrid
                        sx={{
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#D8F3DC",
                                color: "#1b4332",
                                fontSize: 16,
                            },
                            ".MuiDataGrid-cell": {
                                // whiteSpace: "normal !important",
                                // wordWrap: "break-word !important",
                            },
                        }}
                        rows={emissions}
                        getRowId={(row) => row.sno}
                        columns={columns1}
                        // checkboxSelection={true}
                        disableRowSelectionOnClick={true}
                        pagination={true}
                        pageSize={pageSize}
                        pageSizeOptions={[5, 10, 20, 50, 100]}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            
                    /> : <></>}
                    {toggleState === 2? 
                        <DataGrid
                        sx={{
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#D8F3DC",
                                color: "#1b4332",
                                fontSize: 16,
                            },
                            ".MuiDataGrid-cell": {
                                // whiteSpace: "normal !important",
                                // wordWrap: "break-word !important",
                            },
                        }}
                        rows={vehicles}
                        getRowId={(row) => row.sno}
                        columns={columns2}
                        // checkboxSelection={true}
                        disableRowSelectionOnClick={true}
                        pagination={true}
                        pageSize={pageSize}
                        pageSizeOptions={[5, 10, 20, 50, 100]}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}

                        
                    />
                    : <></>}
                    {toggleState === 3? 
                        <DataGrid
                        sx={{
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#D8F3DC",
                                color: "#1b4332",
                                fontSize: 16,
                            },
                            ".MuiDataGrid-cell": {
                                // whiteSpace: "normal !important",
                                // wordWrap: "break-word !important",
                            },
                        }}
                        rows={materials}
                        getRowId={(row) => row.sno}
                        columns={columns3}
                        // checkboxSelection={true}
                        disableRowSelectionOnClick={true}
                        pagination={true}
                        pageSize={pageSize}
                        pageSizeOptions={[5, 10, 20, 50, 100]}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}

                        
                    />
                    : <></>}
                    </div>

                    <AddFuel 
                        addFuelPopup={addFuelPopup}
                        setAddFuelPopup={setAddFuelPopup}
                    />
                    <AddVehicle 
                        addVehiclePopup={addVehiclePopup}
                        setAddVehiclePopup={setAddVehiclePopup}
                    />
                    <AddMaterial 
                        addMaterialPopup={addMaterialPopup}
                        setAddMaterialPopup={setAddMaterialPopup}
                    />
            </div>   
        </div>  
    </>
  )
}
