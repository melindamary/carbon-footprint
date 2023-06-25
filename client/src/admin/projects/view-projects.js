import React, { useEffect, useState } from "react";
import { SideNav } from "../sidenav";
import { PageTitle } from "../../pages/components/page-title";
import Axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import '../admin-styles.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Display } from "./display";
import { AddCause } from "./addCause";
import { Edit } from "./updateCause";

export const OffsetProjects = () => {

    const [activeProjects, setActiveProjects] = useState([]);
    const [inactiveProjects, setInactiveProjects] = useState([]);

    const [pageSize, setPageSize] = useState(5);

    const [openPopup, setOpenPopup] = useState(false);

    const [id, setId] = useState(0);
    const [title, setTitle] = useState("")
    const [summary, setSummary] = useState("")
    const [imageLink, setImageLink] = useState("")
    const [link, setLink] = useState("")
    const [doclink, setDocLink] = useState("")
    const [country, setCountry] = useState("")
    const [organization, setOrganization] = useState("")

    const [addPopup, setAddPopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [toggleState, setToggleState] = useState(1);

    useEffect(()=>{
        Axios.get("/view-active-causes").then( (response) => {
                setActiveProjects(response.data)
                Axios.get("/view-inactive-causes").then( (response) => {
                    setInactiveProjects(response.data)
                })
        })
        
        
    }, [activeProjects]);

    const toggle = (index) => {
        setToggleState(index);
        console.log(index);
    }
    const disable = (id) => {
        Axios.put("/disable-cause", {
            id: id,
        });
    }
    const enable = (id) => {
        Axios.put("/enable-cause", {
            id: id,
        });
    }

    const columns = [
        {field: 'project_id', headerName: 'Project ID', width: 160},
        {field: 'project_name', headerName: 'Project', width: 450},
        {field: 'location', headerName: 'Location', width: 140},
        {field: 'actions1', headerName:'View', width:70, renderCell: (params)=>{
            return(
                <>
                <button className='view-button'
                    onClick={(event) => {
                        setOpenPopup(true);
                        setTitle(params.row.project_name)
                        setSummary(params.row.project_description)
                        setImageLink(params.row.image_url)
                        setLink(params.row.project_link)
                        setDocLink(params.row.documentation_link)
                        setCountry(params.row.location)
                        setOrganization(params.row.provider_organization)
                    }}
                ><KeyboardDoubleArrowRightIcon/></button>
                
                </>
            )
        }},
        {field: 'actions2', headerName:'Edit', width:70, renderCell: (params)=>{
            return(
                <>
                <button className='edit-button'
                    onClick={(event) => {
                        setEditPopup(true)
                        setId(params.row.project_id)
                        setTitle(params.row.project_name)
                        setSummary(params.row.project_description)
                        setImageLink(params.row.image_url)
                        setLink(params.row.project_link)
                        setDocLink(params.row.documentation_link)
                        setCountry(params.row.location)
                        setOrganization(params.row.provider_organization)
                    }}><EditIcon /></button>
                </>
            )
        }},
        {field: 'actions3', headerName:'', width:100, renderCell: (params)=>{
            if(params.row.status === 1) {
            return(
                <>
                <button className='disable-button'
                    onClick={(event) => {
                        disable(params.row.project_id)
                    }}
                >Disable</button>
                </>
            )
            }
            else {
                return(
                    <>
                    <button className='enable-button'
                        onClick={(event) => {
                            enable(params.row.project_id)
                        }}
                    >Enable</button>
                    </>
                )
            }

        }},
    ];


    return (
        <>
        <div className="home">
            <SideNav />
            <PageTitle name="Carbon Offset Projects"/>
            <div className="content">
                <div className="header-section">
                    <div className="tabs-section">
                        <button className={toggleState === 1? "tab-active" : "tabs-section-button"} 
                            onClick={() => {toggle(1)}}>Active Projects</button>
                        <button className={toggleState === 2? "tab-active" : "tabs-section-button"}  
                            onClick={() => {toggle(2)}}>Inactive Projects</button>
                    </div>

                    <button className='add-cause' 
                        onClick={() => {setAddPopup(true)}}>
                        Add Cause
                    </button>

                </div>
                    
                
                <div style={{width:"80%", height: "560px", margin: "auto",}}>
                {toggleState === 1? 
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
                        rows={activeProjects}
                        getRowId={(row) => row.project_id}
                        columns={columns}
                        checkboxSelection={false}
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
                            '& .MuiDataGrid-cell:focus': {
                            outline: ' none'
                            },
                            '& .MuiDataGrid-cell:active':{
                                outline: ' none',
                                border: 'none'
                            }
                        }}
                        rows={inactiveProjects}
                        getRowId={(row) => row.project_id}
                        columns={columns}
                        checkboxSelection={false}
                        disableRowSelectionOnClick={true}
                        pagination={true}
                        pageSize={pageSize}
                        pageSizeOptions={[5, 10, 20, 50, 100]}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    />
                    : <></>
                    }
                </div>
                <AddCause
                    addPopup={addPopup}
                    setAddPopup={setAddPopup}
                 />
                 <Edit
                    editPopup={editPopup}
                    setEditPopup={setEditPopup}
                    id={id} title={title}
                    presummary={summary} preimageLink={imageLink} prelink={link}
                    predoclink={doclink} precountry={country} preorganization={organization}
                 />
                <Display 
                     openPopup={openPopup} setOpenPopup={setOpenPopup} title={title}
                     summary={summary} imageLink={imageLink} link={link}
                     doclink={doclink} country={country} organization={organization}
                />
                
                
            </div>  
            
        </div>  
        </>
        
    );
}