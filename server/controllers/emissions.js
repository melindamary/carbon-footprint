import { db } from "../db.js";

export const getEmissionsInfo = (req, res) => {
    db.query("SELECT ROW_NUMBER() OVER (ORDER BY fc.category_name) as sno, eu.activity_id, eu.activity_item as activity, \
     eu.emissions_per_unit as emissions, fc.category_name as category FROM energy_usage as eu INNER JOIN footprint_category as fc \
    ON fc.category_id = eu.category_id WHERE eu.category_id IN (1,2,3)", (err, result) => {
        // console.log(result)
        res.send(result);
    })
}

export const getVehiclesInfo = (req, res) => {
    db.query("SELECT ROW_NUMBER() OVER (ORDER BY eu.activity_id) as sno, eu.activity_id, eu.activity_item as activity,\
             eu.emissions_per_unit as emissions, t.vehicle_type, t.vehicle_size as size, t.fuel_type as fuel \
             FROM energy_usage as eu INNER JOIN footprint_category as fc ON fc.category_id = eu.category_id \
             INNER JOIN transportation as t ON t.vehicle_id = eu.activity_id", (err, result) => {
        // console.log(result)
        res.send(result);
    })
}

export const getMaterialsInfo = (req, res) => {
    db.query("SELECT ROW_NUMBER() OVER (ORDER BY eu.activity_id) as sno, eu.activity_id, eu.activity_item as activity, \
            eu.emissions_per_unit as emissions, m.material_activity as type FROM energy_usage as eu INNER JOIN footprint_category as fc \
            ON fc.category_id = eu.category_id INNER JOIN materials as m ON m.material_usage_id = eu.activity_id", (err, result) => {
        // console.log(result)
        res.send(result);
    })
}


export const addEmissionsFuel = (req, res) => {
    const item = req.body.name;
    const emissions = req.body.emissions;
    const category = 3;
    db.query("Insert into energy_usage(activity_item, category_id, emissions_per_unit) values(?,?,?)",
    [item, category, emissions], (err, result) => {
        if(err) console.log(err);
        else console.log("Inserted");
    })
}

export const addEmissionsVehicle = (req, res) => {
    const name= req.body.name;
    const type= req.body.type;
    const size= req.body.size;
    const fuel= req.body.fuel;
    const emissions= req.body.emissions;
    const category = 4;

    db.query("Insert into energy_usage(activity_item, category_id, emissions_per_unit) values(?,?,?)",
    [name, category, emissions], (err, result) => {
        if(err) console.log(err);
        else{
            db.query("Select activity_id from energy_usage where activity_item = ?",name,(err, result) => {
                const id = result[0].activity_id;
                db.query("Insert into transportation(vehicle_id, vehicle_type, vehicle_size, fuel_type) \
                values(?,?,?,?)",[id, type, size, fuel], (err, result) => {
                    if(err) console.log(err);
                    else console.log("Inserted");
                })
            })
        }
    })
}


export const addEmissionsMaterial = (req, res) => {
    const name= req.body.name;
    const activity= req.body.activity;
    const emissions= req.body.emissions;
    const category= 5;
    console.log("yo")
    db.query("Insert into energy_usage(activity_item, category_id, emissions_per_unit) values(?,?,?)",
    [name, category,emissions], (err, result) => {
        if(err) console.log(err);
        else{
            db.query("Select activity_id from energy_usage where activity_item = ? and emissions_per_unit = ?",
            [name, emissions], (err, result) => {
                const id = result[0].activity_id;
                db.query("Insert into materials(material_usage_id, material_activity) values(?,?)",
                [id, activity],(err, result) => {
                    if(err) console.log(err);
                    else console.log("Inserted");
                })
            })
        }
    })
}

export const deleteFuel = (req, res) => {
    db.query('Delete from energy_usage where activity_id = ?', req.params.id, (err, result) => {
        if(err) console.log(err);
        else{
            console.log("Deleted");
        }
    })
}

export const deleteVehicle = (req, res) => {
    db.query('Delete from energy_usage where activity_id = ?', req.params.id, (err, result) => {
           db.query('Delete from transportation where vehicle_id = ?',req.params.id, (err, result) =>{
                if(err) console.log(err);
                else console.log("Deleted");
           })
    })
}

export const deleteMaterial = (req, res) => {
    db.query('Delete from energy_usage where activity_id = ?', req.params.id, (err, result) => {
           db.query('Delete from materials where material_usage_id = ?',req.params.id, (err, result) =>{
                if(err) console.log(err);
                else console.log("Deleted");
           })
    })
}