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

export const ViewPosts = () => {
    const [posts, setPosts] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const navigate = useNavigate();

    const deletePost = (postId) => {
        console.log(postId)
        Axios.delete(`/delete-post/${postId}`).then((response) => {
            console.log(response);
            navigate("/view-posts")
        })
    }

    const viewPost = (postId) => {
        navigate("/read-post-admin", {state: {id: postId, link: "/view-posts"}});
    }

    useEffect(() => {
        Axios.get("/view-post").then((response) => {
            setPosts(response.data);
            console.log(posts);
        })
    }, [posts]);

    const columns = [
        {field: 'post_id', headerName: 'Post Id', width: 220},
        {field: 'post_title', headerName: 'Post Title', width: 280},
        {field: 'post_date', headerName: 'Created at', width: 220, renderCell: params=>moment(params.row.join_date).format('DD-MM-YYYY')},
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
        {field: 'actions2', headerName:'Delete', width:70, renderCell: (params)=>{
            return(
                <>
                <button className='delete-button'
                    onClick={(event) => {
                        deletePost(params.row.post_id)
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
                        navigate("/blog");
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

                </div>
            </div>   
        </div>  
    </>
  )
}
