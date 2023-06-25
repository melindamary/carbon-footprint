import { db } from "../db.js";

export const adminLeaderboard = (req, res) => {
    db.query("Select ROW_NUMBER() OVER (ORDER BY userinfo.userid) as sno, userinfo.userid, sum(user_footprint.calculated_value) as total \
     from userinfo inner join user_footprint on userinfo.userid = user_footprint.userid\
     where not userinfo.email= 'admin@gmail.com'\
     group by user_footprint.userid", (err, result) => {
        res.send(result);
    })
}