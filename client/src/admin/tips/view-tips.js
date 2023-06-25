import React, { useEffect, useState } from "react";
import { SideNav } from "../sidenav";
import { PageTitle } from "../../pages/components/page-title";
import Axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import '../admin-styles.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import { Display } from "./displayAction";
import { AddAction } from "./addAction";
import { Edit } from "./updateAction";

export const AdminTips = () => {

    const [pageSize, setPageSize] = useState(5);

    const [tips, setTips] = useState([]);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [id, setId] = useState(0);
    
    const [openPopup, setOpenPopup] = useState(false);

    const [addTipPopup, setAddTipPopup] = useState(false);
    const [editTipPopup, setEditTipPopup] = useState(false);
    const [toggleState, setToggleState] = useState(1);

    useEffect(()=>{
        Axios.get("/view-tips").then( (response) => {
                setTips(response.data)
                // console.log(response.data)
        })  
        
    }, [tips]);

    const toggle = (index) => {
        setToggleState(index);
        console.log(index);
    }

    const columns = [
        {field: 'sno', headerName: 'S.No.', width: 130},
        {field: 'tip_title', headerName: 'Action', width: 280},
        {field: 'category_name', headerName: 'Category', width: 180},
        {field: 'action', headerName:'View', width:80, renderCell: (params)=>{
            return(
                <>
                <button className='view-button'
                    onClick={(event) => {
                        setOpenPopup(true);
                        setTitle(params.row.tip_title);
                        setDesc(params.row.tip_description)
                    }}
                ><KeyboardDoubleArrowRightIcon/></button>
                
                </>
            )
        }},
        {field: 'actions2', headerName:'Edit', width:80, renderCell: (params)=>{
            return(
                <>
                <button className='edit-button'
                    onClick={(event) => {
                        setEditTipPopup(true)
                        setId(params.row.tip_id);
                        
                    }}><EditIcon /></button>
                </>
            )
        }},
    ];


    return (
        <>
        <div className="home">
            <SideNav />
            <PageTitle name="Actions"/>
            <div className="content">
                <div className="header-section">
                    <button className='add-tip' 
                        onClick={() => {setAddTipPopup(true)}}>
                        Add Action
                    </button>

                </div>
                    
                
                <div style={{width:"60%", height: "560px", margin: "auto", marginTop: "10px"}}>
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
                                outline: ' none',
                                border: 'none'
                            }
                        }}
                        rows={tips}
                        getRowId={(row) => row.sno}
                        columns={columns}
                        checkboxSelection={false}
                        disableRowSelectionOnClick={true}
                        pagination={true}
                        pageSize={pageSize}
                        pageSizeOptions={[5, 10, 20, 50, 100]}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    />
                </div>
                 <AddAction
                    addTipPopup={addTipPopup}
                    setAddTipPopup={setAddTipPopup}
                 />
                 <Edit
                    editTipPopup={editTipPopup}
                    setEditTipPopup={setEditTipPopup}
                    id={id}
                 />
                <Display 
                     openPopup={openPopup} setOpenPopup={setOpenPopup} 
                     title={title} desc={desc}
                /> 
                
                
            </div>  
            
        </div>  
        </>
        
    );
}