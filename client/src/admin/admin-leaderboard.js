import React, { useEffect, useState } from 'react'
import { SideNav } from './sidenav.js'
import { PageTitle } from '../pages/components/page-title'
import Axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

export const AdminLeaderboard = () => {
    const [details, setDetails] = useState([]);

    useEffect(() => {
        Axios.get("admin-leaderboard").then((response) => {
            setDetails(response.data);
        })
    }, []);

    const columns = [
        {field: 'sno', headerName: 'S.No', width: 220},
        {field: 'userid', headerName: 'User ID', width: 220},
        {field: 'total', headerName: 'Total Footprint', width: 280},
    ];

  return (
    <>
        <div className="home">
            <SideNav/>
            <PageTitle name="Leaderboard"/>
            <div className="content">
                <div style={{width:"80%", height: "500px", margin:"auto", marginTop: "15px"}}>
                    <DataGrid
                        sx={{
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#D8F3DC",
                                color: "#1b4332",
                                fontSize: 16,
                            },
                            '& .MuiDataGrid-cell:focus': {
                            outline: ' none'
                            },
                            '& .MuiDataGrid-cell:active':{
                                outline: ' none'
                            }
                        }}
                        rows={details}
                        getRowId={(row) => row.userid}
                        columns={columns}
                        // checkboxSelection={true}
                        disableRowSelectionOnClick={true}
                        pagination={true}
                        // pageSize={pageSize}
                        pageSizeOptions={[5, 10, 20, 50, 100]}
                        // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    />
                </div>
            </div>   
        </div>  
    </>
  )
}
