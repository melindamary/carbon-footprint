import React, { useEffect, useState } from "react";
import { SideNav } from "../components/sidenav";
import { PageTitle } from "../components/page-title";
import "./resources-style.css";
import Axios from 'axios';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

export const Resources = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        Axios.get("/view-post").then((response)=>{
            setPosts(response.data);
            console.log(posts);
        })
    }, []);

    return (
        <>
        <div className="home">
            <SideNav />
            <PageTitle name="Resources"/>
            <div className="content">
                <div className="search-bar">
                    <SearchIcon className="search-icon"/>
                    <input type='text' placeholder='Search by keyword...'
                        onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <div className="resources">

                {posts.filter((post) => {
                    if(searchTerm.length>0){
                        if(post.post_title.toLowerCase().includes(searchTerm.toLowerCase()))
                        return post
                    }
                    else {return post}
                }).map((post, key) => {
                        return (
                            <div className="blog-card-design">
                                {/* <div className="blog-img-div">
                                    
                                </div> */}
                                <div className="blog-div">
                                    <span>{moment(post.post_date).format('ll')}</span>
                                    <h3 key={key}>{post.post_title}</h3>
                                </div>
                                <div className="blog-buttons">
                                    <button onClick={() => {
                                        navigate("/read-post", {state: {id: post.post_id, link: "/resources"}});
                                    }}>
                                    Read More</button>
                                </div>                 
                            </div>
                        )
                        })}
                </div>
                
            </div>   
        </div>  
        </>
        
    );
}