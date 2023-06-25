// * importing the express module and creating the express object
    import express from "express" 
    import bodyParser from "body-parser";
    import cookieParser from "cookie-parser";
    import cors from "cors";
    import { signup, login } from "./controllers/auth.js";
    import { checkoutSession } from "./controllers/checkout-session.js";
    import { userInfo } from "./controllers/users.js";
    import { createPost, viewPost, displayPost, deletePost } from "./controllers/blog.js";
    import { DisableCause, EnableCause, addCause, addCauses, addTransaction, getAllTransactions, getProject, getProjectWiseTransactions, getTransactions, updateCause, viewActiveCauses, viewCause, viewInactiveCauses,} from "./controllers/offset-projects.js";
    import { getEmissions, getFootprint, getFootprintCategoryWise, getCategory, getFuels, addFootprint, getMaterialActivity, getMaterial, addMaterialFootprint, getFootprintCategoryWise2, getVehicles, getVehicleSize, getFuelType, addVehicleFootprint, getFuelDetails, getVehicleDetails, getMaterialDetails } from "./controllers/calculations.js";
import { adminDashboard } from "./controllers/admin.js";
import { adminLeaderboard } from "./controllers/leaderboard.js";
import { addTip, getTips, updateTip, viewTip, viewTips } from "./controllers/tips.js";
import { addEmissionsFuel, addEmissionsMaterial, addEmissionsVehicle, deleteFuel, deleteMaterial, deleteVehicle, getEmissionsInfo, getMaterialsInfo, getVehiclesInfo } from "./controllers/emissions.js";

    const app = express();      
    const port = 3002;

    app.use(cors({
        origin: ("http://localhost:3000"),
        methods: (["PUT", "POST", "DELETE"]),
        credentials: true
    }));

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.json());
    app.use(cookieParser());


// * route definition: the path and the callback function
    app.post("/api/signup", signup);
    app.post("/api/login", login)

    app.post('/api/checkout-session', checkoutSession);

// * Users page - admin
    app.get('/api/user-info', userInfo);

// *Resources page - admin
    app.post('/api/create-blog', createPost);
    app.get('/api/view-post', viewPost);
    app.get('/api/display-post/:id', displayPost);
    app.delete('/api/delete-post/:postId', deletePost);

// * Carbon offset projects - admin
    app.post('/api/causes', addCauses);
    app.get('/api/view-active-causes', viewActiveCauses);
    app.get('/api/view-inactive-causes', viewInactiveCauses);

app.get('/api/view-cause/:id', viewCause);
    app.get('/api/get-project/:id', getProject);
    app.put('/api/disable-cause', DisableCause);
    app.put('/api/enable-cause', EnableCause);

    app.get('/api/get-transactions/:userid', getTransactions);
    app.get('/api/get-all-transactions', getAllTransactions);
    app.get('/api/get-transactions-total-project', getProjectWiseTransactions);
    app.post('/api/add-transaction', addTransaction);

    app.post('/api/add-cause', addCause);
    app.put('/api/update-cause', updateCause);

// *Carbon footprint calculations
    app.get('/api/energy-emissions/:activity', getEmissions);

    app.get('/api/user-footprint/:userid', getFootprint);
    app.get('/api/categorywise-footprint/:userid', getFootprintCategoryWise); //returns json
    app.get('/api/categorywise-footprint2/:userid', getFootprintCategoryWise2); //returns array
    app.get('/api/category', getCategory);

    app.get('/api/fuels', getFuels);
    app.post('/api/add-footprint', addFootprint);

    app.get('/api/material-activity', getMaterialActivity);
    app.get('/api/get-materials/:selectedActivity', getMaterial);
    app.post('/api/add-material-footprint', addMaterialFootprint);

    app.get('/api/get-vehicles', getVehicles);
    app.get('/api/get-vehicle-size', getVehicleSize);
    app.get('/api/get-fuel-type', getFuelType);
    app.post('/api/add-vehicle-footprint', addVehicleFootprint);

    app.get('/api/fuel-details/:id', getFuelDetails);
    app.get('/api/vehicle-details/:id', getVehicleDetails);
    app.get('/api/material-details/:id', getMaterialDetails);

// * Admin Dashboard
    app.get("/api/admin-dashboard", adminDashboard);

// * Admin Leaderboard
    app.get("/api/admin-leaderboard", adminLeaderboard);


// * Tips
    app.post("/api/add-tip", addTip);
    app.get("/api/view-tips", viewTips);
    app.get("/api/view-tip/:id", viewTip);
    app.put("/api/update-tip", updateTip);
    app.get("/api/get-tips", getTips);

// * Category Emissions in Admin
    app.get("/api/emissions-info", getEmissionsInfo);
    app.get("/api/vehicles-info", getVehiclesInfo);
    app.get("/api/materials-info", getMaterialsInfo);

    app.post("/api/add-fuel", addEmissionsFuel);
    app.post("/api/add-vehicle", addEmissionsVehicle);
    app.post("/api/add-material", addEmissionsMaterial);

    app.delete('/api/delete-fuel/:id', deleteFuel);
    app.delete('/api/delete-vehicle/:id', deleteVehicle);
    app.delete('/api/delete-material/:id', deleteMaterial);

// * the server is running on the specified port
    app.listen(port, () => {
        console.log(`The server is running on port ${port}`);
    });