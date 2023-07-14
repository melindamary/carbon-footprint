import { db } from "../db.js";

export const adminDashboard = (req, res) => {
    db.query("Select count(userid) - 1 as userCount from userinfo", (err, result) => {
        const userCount = result[0].userCount;

        db.query("Select count(project_id) as causeCount from offset_project", (err, result) => {
            const causes = result[0].causeCount;

            db.query("Select sum(donated_amount) as amount, sum(offset_amount) as offset from offset_transaction", (err, result) => {
                const amount = result[0].amount;
                const offset = result[0].offset.toFixed(2);
                
                db.query("SELECT AVG(total_sum) as average FROM (SELECT SUM(calculated_value) AS total_sum FROM user_footprint GROUP BY userid) AS subquery", (err, result) => {
                    const avgFootprint = result[0].average.toFixed(2);

                    db.query("Select count(category_id) as count from footprint_category", (err, result) => {

                        const categoryCount = result[0].count;

                        res.send({userCount, causes, amount, offset, avgFootprint, categoryCount});
                    })

                    
                })

                
            })
        })

    });
}