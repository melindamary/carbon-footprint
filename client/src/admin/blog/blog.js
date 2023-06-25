import React, { useState } from 'react'
import './blog-styles.css';
import { SideNav } from '../sidenav.js'
import { PageTitle } from '../../pages/components/page-title'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export const Blog = () => {
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    Axios.post("/create-blog", {
    title: title,
    post: post,
    });

    // console.log();
    navigate("/view-posts");
    
  }
  return (
    <>
        <div className="home">
            <SideNav/>
            <PageTitle name="Resources"/>
            <div className="content">

                <div className="blog-heading">
                  <button className='view-posts'
                      onClick={() => { navigate("/view-posts"); }}
                    > <ArrowBackOutlinedIcon /></button>
                </div>
                <form className='add-post' onSubmit={handleSubmit}>
                  <label htmlFor='title'>Title</label>
                  <input value={title} type="text" name='title' required placeholder='Title...'
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  />

                  <label>Body </label>
                  <div className="editor">
                    <CKEditor
                    editor={ClassicEditor}
                    data={post}
                    onChange={(event, editor) => {
                      const data = editor.getData()
                      setPost(data)
                    }}
                    />
                  </div>

                  <button className='submit-post'> Create Post</button>
                  </form>
            </div>   
        </div>  
    </>
  )
}
