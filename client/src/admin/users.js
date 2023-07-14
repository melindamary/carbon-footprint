import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { SideNav } from './sidenav.js'
import { PageTitle } from '../pages/components/page-title'
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';

export const Users = () => {

    const [users, setUsers] = useState([]);
    const columns = [
        {field: 'sno', headerName: 'S.No.', width: 100},
        {field: 'userid', headerName: 'User ID', width: 100},
        {field: 'name', headerName: 'Name', width: 180},
        {field: 'email', headerName: 'Email', width: 220},
        {field: 'location', headerName: 'Location', width: 200},
        {field: 'join_date', headerName: 'Join Date', width: 140, renderCell: params=>moment(params.row.join_date).format('DD-MM-YYYY')},
    ];
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        console.log("hi");
        Axios.get("/user-info").then((response) => {
            // console.log(response.data);
            setUsers(response.data);
            console.log(users);
        })
    }, []);
    
  return (
    <>
        <div className="home">
            <SideNav/>
            <PageTitle name="Users"/>
            <div className="content">
                <div style={{width: "75%",height: "500px", margin: "auto", marginTop: "10px"}}>
                    <DataGrid
                        sx={{
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#D8F3DC",
                                color: "#1b4332",
                                fontSize: 16,
                                outline: 'none',
                            },
                            '& .MuiDataGrid-cell:focus': {
                                outline: ' none'
                            },
                            '& .MuiDataGrid-columnHeaders:active': {
                                outline: ' none'
                            },
                        }}
                        rows={users}
                        getRowId={(row) => row.userid}
                        columns={columns}
                        // checkboxSelection={true}
                        disableRowSelectionOnClick={true}
                        pagination={true}
                        pageSize={pageSize}
                        pageSizeOptions={[5, 10, 20, 50, 100]}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}

                        
                    />
                </div>
                
            </div>   
        </div>  
    </>
  )
}
