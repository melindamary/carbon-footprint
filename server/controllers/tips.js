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
};

export const viewTips = (req, res) => {
    db.query("Select ROW_NUMBER() OVER (ORDER BY tip.tip_id) as sno, tip.tip_id, tip.tip_title, tip.tip_description,\
    footprint_category.category_name from tip inner join footprint_category on \
    tip.category_id = footprint_category.category_id",(err, result) => {
        res.send(result);
        // console.log(result);
    })
};

export const viewTip = (req, res) => {
    db.query("Select tip.tip_title, tip.tip_description, footprint_category.category_name\
    from tip inner join footprint_category on tip.category_id = footprint_category.category_id\
    where tip.tip_id = ?", req.params.id, (err,result) => {
        res.send(result)
    })
};

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
   
};

export const getTips = (req, res) => {
    db.query("Select tip.tip_id, tip.tip_title, tip.tip_description, footprint_category.category_name, COUNT(ua.userid) as count\
    FROM tip INNER JOIN footprint_category on tip.category_id = footprint_category.category_id LEFT JOIN user_action as ua\
    on ua.tipid = tip.tip_id group by tip.tip_id", (err,result) => {
        // console.log(result);
        res.send(result)
    })
};

export const commitAction = (req, res) => {
    const userid = req.body.userid;
    const tipid = req.body.tipid;

    db.query("Insert into user_action(userid, tipid, date) values (?,?,CURDATE())", [userid, tipid], (err,result) => {
        if(err) console.log(err);
        else{
            console.log("Inserted Successfully")
        }
    })
};

export const isCommitAction = (req, res) => {
    const userid = req.params.userid;
    const tipid = req.params.id;
    console.log(tipid, userid)

    db.query("Select * from user_action where userid = ? and tipid = ?", [userid, tipid], (err, result) => {
        if(err) console.log(err);
        else if(result.length>0) res.send({message: "exists"});
        else if(result.length==0) res.send({message: "not exists"})
    })
};

export const deleteAction = (req, res) => {
    const userid = req.params.userid;
    const tipid = req.params.id;

    db.query("Delete from user_action where userid = ? and tipid = ?", [userid, tipid], (err, result) => {
        if(err) console.log(err);
        else console.log("Deleted action!");
    })
};

export const myTips = (req, res) => {
    db.query("Select t.tip_id, t.tip_title, t.tip_description, fc.category_name, COUNT(ua.userid) as count\
    FROM tip as t INNER JOIN footprint_category as fc ON t.category_id = fc.category_id INNER JOIN user_action as ua\
    on t.tip_id = ua.tipid where ua.userid = ? group by t.tip_id", req.params.userid, (err, result) => {
        if(err) console.log(err);
        // else console.log(result)
        else res.send(result);
    })
};

export const myTipCount = (req, res) => {
    
    db.query("Select tip.tip_id, COUNT(ua.userid) as count FROM tip LEFT JOIN user_action as ua\
    on ua.tipid = tip.tip_id and ua.userid= ? group by tip.tip_id",req.params.userid, (err, result) => {
        if(err) console.log(err);
        else{
            // console.log(result);
            const actionCount = {};
            result.forEach((item) => {
               actionCount[item.tip_id] = item.count
            });
            res.send(actionCount);
        }
    });
}