import React, { useEffect, useState } from "react";
import { SideNav } from "./components/sidenav";
import { PageTitle } from "./components/page-title";
import './home-page/dashboard-styles.css'
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios';
import moment from 'moment';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useNavigate } from "react-router-dom";

export const MyDonations = () => {
    const userid = (JSON.parse(localStorage.getItem("user"))).userid;
    const [transactions, setTransactions] = useState([]);
    const [footprint, setFootprint] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get(`/get-transactions/${userid}`).then((response) => {
            setTransactions(response.data);
        });
        Axios.get(`/categorywise-footprint/${userid}`).then((response) => {
            setFootprint(response.data.total);
        })
    }, [footprint]);

    const columns = [
        {field: 'id', headerName: 'S.No.', width: 100},
        {field: 'project_name', headerName: 'Project Name', width: 390},
        {field: 'donated_amount', headerName: 'Donated Amount', width: 180, renderCell: params=> '₹'+params.row.donated_amount},
        {field: 'offset_date', headerName: 'Date of transaction', width: 160, renderCell: params=>moment(params.row.offset_date).format('DD-MM-YYYY')},
    ];

    return (
        <>
        <div className="home">
            <SideNav />
            <PageTitle name="Donations"/>
            
            <div className="content">
            <div className="calculator-heading footprint-heading">
                     <button onClick={() => {navigate("/home")}}><ArrowBackOutlinedIcon/></button>   
                </div>
                <div className="donations-table">
                    
                    <DataGrid
                        sx={{
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#D8F3DC",
                                color: "#1b4332",
                                fontSize: 16,
                            },
                            ".MuiDataGrid-cell": {
                                whiteSpace: "normal !important",
                                wordWrap: "break-word !important",
                            }
                        }}
                        rows={transactions}
                        getRowId={(row) => row.id}
                        columns={columns}
                        checkboxSelection={false}
                        disableRowSelectionOnClick={true}
                        pagination={true}
                        hideFooterPagination
                        // components={{Toolbar: () => {
                        //     return(
                        //         <div className="table-title">Donation Details</div>
                        //     )
                        // }}}
                    />
                </div>
            </div>   
        </div>  
        </>
        
    );
}
