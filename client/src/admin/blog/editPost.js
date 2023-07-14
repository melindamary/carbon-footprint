import React, { useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { SideNav } from '../sidenav.js'
import { PageTitle } from '../../pages/components/page-title'
import Axios from 'axios';
import "../admin-styles.css";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const EditPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [post, setPost] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [id, setId] = useState(0);
    const [body, setBody] = useState('');

    useEffect(() => {
      setId(location.state.id);
      console.log("id: ",id)
    }, [location.state.id]);

    useEffect(() => {
        if(id!==0) {
          Axios.get(`/display-post/${id}`).then((response) => {
            setPost(response.data);
            // console.log("post",post)
            setTitle(post.post_title)
            setBody(post.post_content || '')
          })
        }
        else console.log("zero");
    }, [id, post]);

    const editPost = (event) => {
       event.preventDefault();
        console.log(id)
        Axios.put("/edit-post", {
        title: title,
        content: content,
        id: id,
        });
    
        console.log("Updated");
        navigate("/view-posts");
        
    }

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

  return(
    <>
        <div className="home">
            <SideNav/>
            <PageTitle name="Resources" back={true} url="/view-posts"/>
            <div className="content">
                <form className='add-post' onSubmit={editPost} encType='multipart/form-data'>
                  <label htmlFor='title'>Title</label>
                  <input value={title} type="text" name='title' required placeholder={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  />

                  <label>Body </label>
                  <div className="editor">
                    <CKEditor
                      editor={ClassicEditor}
                      data={body}
                      config={{
                        forcePasteAsPlainText: true,
                        placeholder: 'Enter your text here...',
                        ckfinder: {
                          uploadUrl: '/upload-image',
                        },
                        extraAllowedContent: 'img[alt, !src]',
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
                        const newdata = editor.getData()
                        setContent(newdata)
                      }}
                    />
                  </div>
                  <button className='submit-post' type="submit">Update Post</button>
                </form>
            </div>   
        </div>  
    </>
  )
}