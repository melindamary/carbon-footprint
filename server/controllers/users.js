import { db } from "../db.js";

export const userInfo = (req, res) => {
    const email = "admin@gmail.com";
    const sql = "Select ROW_NUMBER() OVER (ORDER BY join_date) as sno, name, userid, email, join_date, location from userinfo where NOT email = ? ";
    db.query(sql, email, (err, result) => {
        if(err) console.log(err);
        else if(result.length>0) res.send(result);
    })
}