import React, { useState } from 'react'
import './blog-styles.css';
import { SideNav } from '../sidenav.js'
import { PageTitle } from '../../pages/components/page-title'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const NewPost = () => {
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("/create-blog", {
    title: title,
    post: post,
    });

    // console.log();
    navigate("/view-posts");
  };

  const handleImageUpload = async (file) => {
      try {
        const formData = new FormData();
        formData.append('image', file);
        console.log('file:',file)
        const response = await Axios.post('/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        return { default: response.data.imageUrl };
      } catch (error) {
        console.log('Image upload failed:', error);
        throw error;
      }
  };

  return (
    <>
        <div className="home">
            <SideNav/>
            <PageTitle name="Resources" back={true} url="/view-posts"/>
            <div className="content">
                <form className='add-post' onSubmit={handleSubmit} encType='multipart/form-data'>
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
                    config={{
                        forcePasteAsPlainText: true,
                        placeholder: 'Enter your text here...',
                        ckfinder: {
                          uploadUrl: '/upload-image',
                        },
                    }}
                    onReady={(editor) => {
                        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                          return {
                            upload: async () => {
                              const file = await loader.file;
                              const uploadedImage = await handleImageUpload(file);
                              return { default: uploadedImage.default };
                            },
                          };
                        };
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData()
                      setPost(data)
                    }}
                    />
                  </div>

                  <button className='submit-post'>Create Post</button>
                  </form>
            </div>   
        </div>  
    </>
  )
}
