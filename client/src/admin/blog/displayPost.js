import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Axios from 'axios';
import moment from 'moment';
import '../../pages/resources-page/resources-style.css';

export const DisplayPostComponent = (props) => {
    const navigate = useNavigate();
    const [post, setPost] = useState([]);

    useEffect(() => {
        Axios.get(`/display-post/${props.id}`).then((response) => {
            setPost(response.data);
        })
    }, []);



  return (
    <>    
            <div className="post-content">
                <button className="backbutton" onClick={() => navigate("/view-posts")}><ArrowBackOutlinedIcon fontSize="small" /></button>
                <h2>{post.post_title}</h2>            
                <span>{moment(post.post_date).format('LL')}</span> 
            </div>
            <div className='blog-content'>
                <div dangerouslySetInnerHTML={{__html: post.post_content}}></div>
            </div>
                 
        </>
    
  )
}
