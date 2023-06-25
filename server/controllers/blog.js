import { db } from '../db.js';

export const createPost = (req, res) => {
    const title = req.body.title;
    const post = req.body.post;

    const query = "Insert into post(post_title, post_content, post_date) values (?,?,CURDATE())";
    db.query(query, [title, post], 
        (err,result) => {
            console.log(err);
        })
}

export const viewPost = (req, res) => {
    db.query("Select * from post", (err,result) => {
        if(result.length>0) res.send(result);
    })
}

export const displayPost = (req, res) => {
    db.query("Select * from post where post_id = ?",req.params.id, (err,result) => {
        res.send(result[0]);
    })
}

export const deletePost = (req, res) => {
    db.query("Delete from post where post_id = ?", req.params.postId, 
        (err, result)=>{
            res.send("Deleted successfully")
        })
}