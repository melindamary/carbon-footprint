// * importing the express module and creating the express object
import express from "express" 
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import path from "path";

import { signup, login } from "./controllers/auth.js";
import { checkoutSession } from "./controllers/checkout-session.js";
import { userInfo } from "./controllers/users.js";
import { createPost, viewPost, displayPost, deletePost, editPost } from "./controllers/blog.js";
import { DisableCause, EnableCause, addCause, addCauses, addTransaction, getAllTransactions, getProject, getProjectWiseTransactions, getTransactions, getUserWiseTransactions, updateCause, viewActiveCauses, viewCause, viewInactiveCauses,} from "./controllers/offset-projects.js";
import { getEmissions, getFootprint, getFootprintCategoryWise, getCategory, getFuels, addFootprint, getMaterialActivity, getMaterial, addMaterialFootprint, getFootprintCategoryWise2, getVehicles, getVehicleSize, getFuelType, addVehicleFootprint, getFuelDetails, getVehicleDetails, getMaterialDetails, getTotalFootprint } from "./controllers/calculations.js";
import { adminDashboard } from "./controllers/admin.js";
import { adminLeaderboard } from "./controllers/leaderboard.js";
import { addTip, getTips, updateTip, viewTip, viewTips } from "./controllers/tips.js";
import { addEmissionsFuel, addEmissionsMaterial, addEmissionsVehicle, deleteFuel, deleteMaterial, deleteVehicle, getEmissionsInfo, getMaterialsInfo, getVehiclesInfo } from "./controllers/emissions.js";
import { getOffsetReport } from "./controllers/userReports.js";

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

const storage = multer.diskStorage({
    destination: '../client/public/uploads',
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now();
        // Get the file extension
        // const ext = path.extname(file.originalname);
        // Create the filename with the desired format and extension
        const originalfilename = file.originalname;
        const filename = `${uniqueSuffix}${originalfilename}`
        callback(null, filename);
    }
  });

// configure multer for handling file uploads
const upload = multer({
    // dest: './uploads',
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB size limit for images,
    storage: storage,
});

// Route for handling image upload
app.post('/api/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
      res.status(400).json({ error: 'No image file provided' });
    } else {
    //   const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const imageUrl = `/uploads/${req.file.filename}`;
      res.json({ imageUrl });
    }
});

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
    app.put('/api/edit-post', editPost);

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
    app.get('/api/get-transactions-total-user', getUserWiseTransactions);
    app.post('/api/add-transaction', addTransaction);

    app.post('/api/add-cause', addCause);
    app.put('/api/update-cause', updateCause);

// *Carbon footprint calculations
    app.get('/api/energy-emissions/:activity', getEmissions);

    app.get('/api/user-footprint/:userid', getFootprint);
    app.get('/api/categorywise-footprint/:userid', getFootprintCategoryWise); //returns json
    app.get('/api/categorywise-footprint2/:userid', getFootprintCategoryWise2); //returns array
    app.get('/api/category', getCategory);
    app.get('/api/get-total-footprint/:userid', getTotalFootprint);

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

// * User Reports
    app.get('/api/get-total-offset/:userid', getOffsetReport);

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