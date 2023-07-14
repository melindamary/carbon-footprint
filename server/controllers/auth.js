//Signup, Login and Logout
import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const location = req.body.location;
    const password = req.body.password;

     console.log(name, email, location, password);

    //CHECK EXISTING USER
    const sqlSelect = "Select * from userinfo where email = ?";
    db.query(sqlSelect, [email], (err, result)=> {

        if(err) console.log(err);
        else if(result.length>0) res.send("User already exists!");
        else{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const sqlInsert = "Insert into userinfo (name, email, location, password, join_date) values (?,?,?,?,CURDATE())";
            db.query(sqlInsert, [name, email, location, hash],
                (err,result) => {
                    if(err) console.log(err);
                    res.send("User has been created");
            });
        }
    });
}

export const login = (req, res) => {

    const email = req.body.email;
    // const password = req.body.password;

    const sqlSelect = "Select * from userinfo where email = ? ";
    db.query(sqlSelect, [email], (err, result)=> {

        if(err) res.send(err);
        else if(result.length === 0) res.send({ message:"Wrong username or password!" });
        else {
            //CHECK PASSWORD
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, result[0].password);

            if(!isPasswordCorrect) res.send({ message:"Wrong username or password!" });
            else{
                const token = jwt.sign({ id: result[0].email }, "jwtsecretkey");
                const {password, ...other} = result[0];
                res.send({"token":token, "details": other});
            }
        }
    });
}