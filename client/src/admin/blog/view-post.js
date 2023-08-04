import React, { useState, useEffect } from 'react'
import './blog-styles.css';
import { SideNav } from '../sidenav.js'
import { PageTitle } from '../../pages/components/page-title'
import Axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import "../admin-styles.css";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DeletePost } from './deletePost';


export const ViewPosts = () => {
    const [posts, setPosts] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const navigate = useNavigate();
    const [openPopup, setOpenPopup] = useState(false);
    const [id, setId] = useState(0);

    const viewPost = (postId) => {
        navigate("/read-post-admin", {state: {id: postId, link: "/view-posts"}});
    };

    useEffect(() => {
        Axios.get("/view-post").then((response) => {
            setPosts(response.data);
            // console.log(posts);
        })
    }, [posts]);

    const columns = [
        {field: 'post_id', headerName: 'Post Id', width: 200},
        {field: 'post_title', headerName: 'Post Title', width: 250},
        {field: 'post_date', headerName: 'Created on', width: 220, renderCell: params=>moment(params.row.post_date).format('DD-MM-YYYY')},
        {field: 'actions1', headerName:'View', width:70, renderCell: (params)=>{
            return(
                <>
                <button className='view-button'
                    onClick={(event) => {
                        viewPost(params.row.post_id)
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
                        navigate("/edit-post", {state: {id: params.row.post_id}} )
                    
                    }}><EditIcon /></button>
                </>
            )
        }},
        {field: 'actions3', headerName:'Delete', width:70, renderCell: (params)=>{
            return(
                <>
                <button className='delete-button'
                    onClick={(event) => {
                        setOpenPopup(true)
                        setId(params.row.post_id)
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
            <PageTitle name="Resources"/>
            <div className="content">

                
                <div className='blog'>
                    <button className='new-posts' onClick={() => {
                        navigate("/new-post");
                    }}>New post</button>
                    
                    <div style={{width:"90%", height: "500px", margin:"auto"}}>
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
                            rows={posts}
                            getRowId={(row) => row.post_id}
                            columns={columns}
                            // checkboxSelection={true}
                            disableRowSelectionOnClick={true}
                            pagination={true}
                            pageSize={pageSize}
                            pageSizeOptions={[5, 10, 20, 50, 100]}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        />
                    </div>

                            <DeletePost 
                                openPopup={openPopup}
                                setOpenPopup={setOpenPopup}
                                id={id}
                            />
                </div>
            </div>   
        </div>  
    </>
  )
}
