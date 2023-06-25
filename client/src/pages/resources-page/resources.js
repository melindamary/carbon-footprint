import React, { useEffect, useState } from "react";
import { SideNav } from "../components/sidenav";
import { PageTitle } from "../components/page-title";
import "./resources-style.css";
import Axios from 'axios';
import moment from 'moment';
import { useNavigate } from "react-router-dom";

export const Resources = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get("/view-post").then((response)=>{
            setPosts(response.data);
            console.log(posts);
        })
    }, [])
    return (
        <>
        <div className="home">
            <SideNav />
            <PageTitle name="Resources"/>
            <div className="content">
                <div className="resources">

                {posts.map((post, key) => {
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