import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { SideNav } from '../sidenav.js'
import { PageTitle } from '../../pages/components/page-title'
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import './donations-style.css';

export const DonationInfo = () => {

    const [pageSize, setPageSize] = useState(5);
    const [donations, setDonations] = useState([]);
    const [projectWise, setProjectWise] = useState([]);
    const [userWise, setUserWise] = useState([]);
    const [toggleState, setToggleState] = useState(1);

    const toggle = (index) => {
        setToggleState(index);
        console.log(toggleState);
    }

    

    useEffect(() => {
        Axios.get("/get-all-transactions").then((response) => {
            setDonations(response.data);
        })
        Axios.get("/get-transactions-total-project").then((response) => {
            setProjectWise(response.data);
        })
        Axios.get("/get-transactions-total-user").then((response) => {
            setUserWise(response.data);
        })
    }, []);
    
    const columns1 = [
        {field: 'sno', headerName: 'S.No.', width: 130},
        {field: 'userid', headerName: 'User ID', width: 150},
        {field: 'project_id', headerName: 'Project ID', width: 150},
        {field: 'donated_amount', headerName: 'Donation', width: 150, renderCell: params=> '₹'+params.row.donated_amount},
        {field: 'offset_date', headerName: 'Date', width: 160, 
            renderCell: params=>moment(params.row.offset_date).format('DD-MM-YYYY')},
    ];

    const columns2 = [
        {field: 'sno', headerName: 'S.No.', width: 160},
        {field: 'project_id', headerName: 'Project ID', width: 230},
        {field: 'total', headerName: 'Total Donation Received', width: 200, renderCell: params=> '₹'+params.row.total},
    ];
    const columns3 = [
        {field: 'sno', headerName: 'S.No.', width: 160},
        {field: 'userid', headerName: 'User ID', width: 230},
        {field: 'total', headerName: 'Total Donation Received', width: 200, renderCell: params=> '₹'+params.row.total},
    ];
  return (
    <>
        <div className="home">
            <SideNav/>
            <PageTitle name="Donations"/>
            <div className="content">

                <div className="tabs">
                    <button className={toggleState === 1 ? "active-tab" : "tab-button"} onClick={() => toggle(1)}>All Donations</button>
                    <button className={toggleState === 2 ? "active-tab" : "tab-button"} onClick={() => toggle(2)}>Project wise</button>
                    <button className={toggleState === 3 ? "active-tab" : "tab-button"} onClick={() => toggle(3)}>User wise</button>
                </div>
                
                <div style={{width: "60%",margin: "auto", height: "500px", justifyContent:'center'}}>
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
                        rows={donations}
                        getRowId={(row) => row.sno}
                        columns={columns1}
                        // checkboxSelection={true}
                        disableRowSelectionOnClick={true}
                        pagination={true}
                        pageSize={pageSize}
                        pageSizeOptions={[5, 10, 20, 50, 100]}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}

                        
                    /> 
                    : <></>}

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
                        rows={projectWise}
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
                        rows={userWise}
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
                
            </div>   
        </div>  
    </>
  )
}
