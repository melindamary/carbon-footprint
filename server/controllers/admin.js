import { db } from "../db.js";

export const adminDashboard = (req, res) => {
    db.query("Select count(userid) - 1 as userCount from userinfo", (err, result) => {
        const userCount = result[0];

        db.query("Select count(project_id) as causeCount from offset_project", (err, result) => {
            const causes = result[0];

            db.query("Select sum(donated_amount) as amount from offset_transaction", (err, result) => {
                const amount = result[0];

                res.send({userCount, causes, amount});
            })
        })

    });
}