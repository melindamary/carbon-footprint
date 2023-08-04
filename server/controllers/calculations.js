import { db } from '../db.js';

export const getEmissions = (req, res) => {
    console.log(req.params.activity)
    db.query("Select emissions_per_unit, activity_id from energy_usage where activity_item = ? ",
        req.params.activity, (err, result) => {
            // console.log(result);
            res.send(result);
        } 
    )
};

export const getFootprint = (req, res) => {
    db.query("Select activity_id, calculated_value from user_footprint where userid = ?", req.params.userid,
    (err,result) => {
        // console.log(result)
        res.send(result);
    })
};

export const getFootprintCategoryWise = (req, res) => {

    var electricity = 0;
    var water = 0;
    var fuels = 0;
    var vehicles = 0;
    var materials = 0;

    db.query("Select sum(user_footprint.calculated_value) AS total, energy_usage.category_id, footprint_category.category_name \
     from user_footprint inner join energy_usage on user_footprint.activity_id = energy_usage.activity_id inner join footprint_category \
     on footprint_category.category_id = energy_usage.category_id where user_footprint.userid = ? and YEAR(user_footprint.calculated_date) = ?\
     group by category_id order by category_id ", [req.params.userid, req.params.year],
     (err, result) => {

        result.forEach(x => {
            if(x.category_id == 1) electricity = x.total;
            if(x.category_id == 2) water = x.total;
            if(x.category_id == 3) fuels = x.total;
            if(x.category_id == 4) vehicles = x.total;
            if(x.category_id == 5) materials = x.total;
        })
        const total = electricity + water + fuels + vehicles + materials;

        // console.log(result)
        res.send({
            "electricity": electricity,
            "water": water,
            "fuels": fuels,
            "vehicles": vehicles,
            "materials": materials,
            "total": total,
        });
      
    })

};

//total footprint by category of user
export const getFootprintCategoryWise2 = (req, res) => {

    db.query("Select sum(user_footprint.calculated_value) AS total,\
             energy_usage.category_id, footprint_category.category_name \
            from user_footprint inner join energy_usage on user_footprint.activity_id = energy_usage.activity_id inner join footprint_category \
            on footprint_category.category_id = energy_usage.category_id where user_footprint.userid = ? and YEAR(user_footprint.calculated_date) = ? group by category_id order by category_id ",
            [req.params.userid, req.params.year],
      (err, result) => {
        if(err) console.log(result);
        res.send(result);
      
    })

};

export const getTotalFootprint = (req, res) => {
    db.query("Select sum(calculated_value) as total from user_footprint where userid = ?", [req.params.userid], 
    (err, result) => {
        if(err) console.log(err);
        else {
            const total = result[0].total === null ? 0 : result[0].total;
            
           res.send({total});
        }
    })
};

export const getTotalYearlyFootprint = (req, res) => {
    db.query("Select sum(calculated_value) as total from user_footprint where userid = ? and YEAR(calculated_date) = ?", [req.params.userid, req.params.year], 
    (err, result) => {
        if(err) console.log(err);
        else {
            const total = result[0].total === null ? 0 : result[0].total;
            
           res.send({total});
        }
    })
};

export const getCategory = (req, res) => {
    db.query("Select * From footprint_category", (err,result) => {
        res.send(result);
    })
};

export const getFuels = (req, res) => {
    db.query("Select * from energy_usage where category_id = 3", (err, result) => {
        res.send(result);
    })
};

export const addFootprint = (req, res) => {
    const activity = req.body.activity;
    const amount = req.body.amount;
    const userid = req.body.userid;

    db.query("Select activity_id, emissions_per_unit from energy_usage where activity_item=?",activity, (err, result) => {
        // console.log(result[0].emissions_per_unit);
        const activityid = result[0].activity_id;
        const emissions = result[0].emissions_per_unit;
        const total = amount * emissions;
        // console.log(total)
        if(activityid ==  1 || activityid == 2)
        {
            db.query("Select * from user_footprint where userid=? and activity_id=? and YEAR(calculated_date)=YEAR(CURDATE())",
                    [userid,activityid], (err, result) => {
                        if(result.length>0) {
                            db.query("Update user_footprint set quantity = ?, calculated_value = ?, calculated_date = CURDATE() where activity_id = ? and userid=?",
                            [amount, total, activityid, userid]), (err, result) => {
                                if(err) console.log(err);
                                res.send({"message": "Total emissions updated!"}) 
                            }
                            
                        }
                        else if(result.length===0){
                            db.query("Insert into user_footprint(userid, activity_id, calculated_value, calculated_date) values(?,?,?,CURDATE())",
                            [userid,activityid,total], (err, result) => {
                                console.log("Inserted successfully")
                            })
                        }
                    })
        }
        else{
            db.query("Insert into user_footprint(userid, activity_id, calculated_value, calculated_date) values (?,?,?,CURDATE())",
            [userid, activityid, total], (err,result) => {
            console.log("Inserted successfully");
        })
        }
        
    } )

};

export const getMaterialActivity = (req, res) => {
    db.query("Select DISTINCT material_activity from materials", (err, result) => {
        res.send(result);
    })
};

export const getMaterial = (req, res) => {

    const activity = req.params.selectedActivity;

    db.query("Select energy_usage.activity_item from energy_usage inner join materials \
    on energy_usage.activity_id = materials.material_usage_id where \
    materials.material_activity = ? ", activity, (err, result) => {
       res.send(result);
    })
};

export const addMaterialFootprint = (req, res) => {
    const userid = req.body.userid;
    const material_activity = req.body.material_activity;
    const material = req.body.material;
    const amount = req.body.amount;
    console.log(userid, material_activity, amount, material);
    db.query("Select energy_usage.emissions_per_unit, energy_usage.activity_id from energy_usage inner join materials \
    on energy_usage.activity_id = materials.material_usage_id where materials.material_activity = ? \
    and energy_usage.activity_item = ? ", [material_activity, material], (err, result) => {

        const emissions = result[0].emissions_per_unit;
        const activityid = result[0].activity_id;
        const total = amount * emissions;
        
        db.query("Insert into user_footprint(userid, activity_id, quantity, calculated_value, calculated_date) values (?,?,?,?,CURDATE())",
        [userid, activityid, amount, total], (err, result) => {
            console.log("Inserted Successfully");
        })
    })
};

export const getVehicles = (req, res) => {
    db.query("Select distinct vehicle_type as type from transportation", (err, result) =>{
        res.send(result)
    })
};

export const getVehicleSize = (req, res) => {
    // console.log(req.params.selectedVehicle);
    db.query("Select distinct vehicle_size as size from transportation", (err, result) =>{
        res.send(result)
    })
};

export const getFuelType = (req, res) => {
    // const vehicle = req.params.selectedVehicle;
    // const size = req.params.size;
    db.query("Select distinct fuel_type as fuel from transportation",(err, result) =>{
        res.send(result)
    })
};

export const addVehicleFootprint = (req, res) => {

    const userid = req.body.userid;
    const type = req.body.vehicle;
    const size = req.body.size;
    const fuel = req.body.fuel;
    const amount = req.body.amount;
    const mileage = req.body.mileage;

    db.query("Select transportation.vehicle_id, energy_usage.emissions_per_unit from \
    transportation inner join energy_usage on transportation.vehicle_id = energy_usage.activity_id \
    where transportation.vehicle_type=? and transportation.vehicle_size=? and transportation.fuel_type=? ", 
    [type, size, fuel], (err, result) => {
       
        const id = result[0].vehicle_id;
        const emissions = result[0].emissions_per_unit;
        const total = amount * mileage * emissions;

        db.query("Insert into user_footprint(userid, activity_id, calculated_value, calculated_date)\
        values(?,?,?,CURDATE())", [userid,id,total], (err,result) => {
            console.log("Inserted Successfully");
        })

    })
};

export const getFuelDetails = (req, res) => {

    db.query("Select ROW_NUMBER() OVER (ORDER BY energy_usage.activity_item) as sno, sum(user_footprint.calculated_value) as sum, energy_usage.activity_item from user_footprint\
    inner join energy_usage on user_footprint.activity_id = energy_usage.activity_id\
     where energy_usage.category_id = 3 and user_footprint.userid = ? and YEAR(user_footprint.calculated_date) = ? \
      group by energy_usage.activity_item", [req.params.id, req.params.year], (err, result) => {
        res.send(result);
     })
};

export const getVehicleDetails = (req, res) => {
    db.query("Select ROW_NUMBER() OVER (ORDER BY energy_usage.activity_item) as sno, sum(user_footprint.calculated_value) as sum, user_footprint.quantity as quantity,\
    transportation.vehicle_type, transportation.vehicle_size, transportation.fuel_type\
    from user_footprint inner join energy_usage on user_footprint.activity_id = energy_usage.activity_id \
    inner join transportation on transportation.vehicle_id = energy_usage.activity_id \
    where energy_usage.category_id = 4 and user_footprint.userid = ? and YEAR(user_footprint.calculated_date) = ? \
    group by energy_usage.activity_item", [req.params.id, req.params.year], (err, result) => {
        
        res.send(result);
     })
};

export const getMaterialDetails = (req, res) => {
    db.query("Select ROW_NUMBER() OVER (ORDER BY energy_usage.activity_item) as sno, energy_usage.activity_item as item, \
    sum(user_footprint.calculated_value) as sum, materials.material_activity as type \
    from user_footprint inner join energy_usage on user_footprint.activity_id = energy_usage.activity_id \
    inner join materials on materials.material_usage_id = energy_usage.activity_id \
    where energy_usage.category_id = 5 and user_footprint.userid = ? and YEAR(user_footprint.calculated_date) = ?\
    group by energy_usage.activity_id", [req.params.id, req.params.year], (err, result) => {
        // console.log(result);
        res.send(result);
     })
};

export const getCategoryNames = (req, res) => {
    db.query("Select category_name from footprint_category", (err, result) => {
        res.send(result);
    })
};