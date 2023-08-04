import { db } from '../db.js';

export const getOffsetReport = (req, res) => {
    db.query("Select SUM(offset_amount) as offset, COUNT(DISTINCT(project_id)) as count from offset_transaction where userid = ?", req.params.userid, (err, result) => {
        if(err) console.log(err);
        else {
            const offset = result[0].offset === null ? 0 : result[0].offset.toFixed(2);
            const count = result[0].count;
            // console.log({offset,count});
            res.send({offset, count});
        }
    })
};

export const totalActions = (req, res) => {
    db.query("Select COUNT(*) as count from user_action where userid = ? ", req.params.userid, (err, result) =>{
        if(err) console.log(err);
        res.send(result);
    })
};