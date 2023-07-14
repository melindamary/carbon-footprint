import { db } from "../db.js";

export const addCauses = (req, res) => {
    const projects = req.body.projects;
    const query = "Insert into offset_project values (?,?,?,?,?,?,?,?)";

    projects.map((project, key) => {
        db.query(query, [project.id, project.title, project.summary, project.country, project.organization.name, project.projectLink, project.additionalDocumentation,
            project.image.imagelink[5].url], 
            (err, result) => {
                console.log(key, err);
            })
    })
}

export const viewActiveCauses = (req, res) => {
    db.query("Select * from offset_project where status = 1", (err,result) => {
        res.send(result);
    });
}

export const viewInactiveCauses = (req, res) => {
    db.query("Select * from offset_project where status = 0", (err,result) => {
        res.send(result);
    });
}

export const viewCause = (req, res) => {
    db.query("Select * from offset_project where project_id=?",req.params.id, (err,result) =>{
        res.send(result);
    })
}
export const DisableCause = (req, res) => {
    db.query("Update offset_project set status = 0 where project_id = ?", req.body.id,
    (err, result) => {
        console.log("updated");
    })
}
export const EnableCause = (req, res) => {
    db.query("Update offset_project set status = 1 where project_id = ?", req.body.id,
    (err, result) => {
        console.log("updated");
    })
}

export const updateCause = (req, res) => {
        
        const name = req.body.name;
        const summary = req.body.summary;
        const location = req.body.location;
        const organization = req.body.organization;
        const site = req.body.site;
        const doc = req.body.doc;
        const image = req.body.image;
        const id = req.body.id;
        
    db.query("Update offset_project set project_name=?,project_description=?, location=?,\
    provider_organization=?, project_link=?, documentation_link=?, image_url=? where project_id = ?",
    [name,summary,location,organization,site,doc,image,id], (err, result) => {
        console.log(err);
    })
}

export const getTransactions = (req, res) => {

    console.log(req.params.userid);
    
    db.query("Select ROW_NUMBER() OVER (ORDER BY offset_transaction.offset_date) as id, offset_transaction.donated_amount, offset_transaction.offset_date, \
    offset_project.project_name from offset_transaction inner join offset_project on \
    offset_project.project_id = offset_transaction.project_id where offset_transaction.userid = ?",
    req.params.userid, (err, result) => {
        res.send(result);
    })
}

export const getAllTransactions = (req, res) => {
    db.query("Select ROW_NUMBER() OVER (ORDER BY offset_date) as sno, userid, project_id, \
    donated_amount, offset_date from offset_transaction", (err, result) => {
       res.send(result);
    })
}

export const getProjectWiseTransactions = (req, res) => {
    db.query("Select ROW_NUMBER() OVER (ORDER BY project_id) as sno, project_id, sum(donated_amount) as total \
    from offset_transaction group by project_id", (err, result) => {
       res.send(result);
    })
}

export const getUserWiseTransactions = (req, res) => {
    db.query("Select ROW_NUMBER() OVER (ORDER BY userid) as sno, userid, sum(donated_amount) as total \
    from offset_transaction group by userid", (err, result) => {
       res.send(result);
    })
}

export const addTransaction = (req, res) => {

    const userid = req.body.userid;
    const projectid = req.body.projectid;
    const amount = req.body.amount; //donated amount
    const offset = amount/164;  //1kg CO2e = $2 = 2*82 rupees
    db.query("Insert into offset_transaction(userid, project_id, donated_amount, offset_amount, offset_date) \
    values (?,?,?,?,CURDATE())",[userid, projectid, amount, offset], (err, result) => {
        console.log("Inserted successfully");
    })
}

export const getProject = (req, res) => {
    db.query("Select * from offset_project where project_id = ?", req.params.id, (err, result) => {
        res.send(result);
    })
}

export const addCause = (req, res) => {
    const name = req.body.name;
    const summary = req.body.summary;
    const location = req.body.location;
    const org = req.body.organization;
    const site = req.body.site;
    const doc = req.body.doc;
    const image = req.body.image;
console.log(name);
    db.query("Insert into offset_project(project_name, project_description, location, provider_organization,\
        project_link, documentation_link, image_url) values(?,?,?,?,?,?,?)",
        [name, summary, location, org, site, doc, image ], (err, result) => {
            console.log("Inserted Successfully");
        })
}
