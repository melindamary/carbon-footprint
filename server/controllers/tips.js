import { response } from "express";
import {db} from "../db.js";

export const addTip = (req, res) => {
    const category = req.body.category;
    const title = req.body.title;
    const desc = req.body.desc;

    db.query("Select category_id from footprint_category where category_name = ?",category, 
        (err, result) => {
            const id = result[0].category_id;

            db.query("Insert into tip(category_id, tip_title, tip_description) values(?,?,?)", [id, title, desc],
            (err, result) => {
                console.log("Inserted successfully");
            })
    } )
}

export const viewTips = (req, res) => {
    db.query("Select ROW_NUMBER() OVER (ORDER BY tip.tip_id) as sno, tip.tip_id, tip.tip_title, tip.tip_description,\
    footprint_category.category_name from tip inner join footprint_category on \
    tip.category_id = footprint_category.category_id",(err, result) => {
        res.send(result);
        // console.log(result);
    })
}

export const viewTip = (req, res) => {
    db.query("Select tip.tip_title, tip.tip_description, footprint_category.category_name\
    from tip inner join footprint_category on tip.category_id = footprint_category.category_id\
    where tip.tip_id = ?", req.params.id, (err,result) => {
        res.send(result)
    })
}

export const updateTip  = (req, res) => {
    const title = req.body.title;
    const id = req.body.id;
    const desc = req.body.desc;
    db.query("Select category_id from footprint_category where category_name = ?", req.body.category,
    (err, result) => {
        const catid = result[0].category_id;
        
        db.query("Update tip set tip_title = ?, tip_description = ?, category_id = ? where tip_id = ?",
        [title, desc, catid, id], (err, result) => {
            console.log("updated");
        })
    })
   
}

export const getTips = (req, res) => {
    db.query("Select tip.tip_id, tip.tip_title, tip.tip_description, footprint_category.category_name\
    from tip inner join footprint_category on tip.category_id = footprint_category.category_id", (err,result) => {
        res.send(result)
    })
}