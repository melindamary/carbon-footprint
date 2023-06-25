import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCookies } from "react-cookie";
import PrivateRoutes from "./pages/components/ProtectedRoute.js";
import { AuthContext } from "./context/Context.js";

// * ------PAGES------ *//
import { Main } from "./pages/main-page/main.js";
import { Login } from './pages/login-page/login.js';
import { SelectUser } from "./pages/login-page/selectUser.js";
import { Signup } from "./pages/signup-page/signup.js";
import { Home } from "./pages/home-page/dashboard.js";
import { About } from "./pages/main-page/about.js";

import { Footprint } from "./pages/your-footprint-page/footprint.js";
import { CategoryWater } from "./pages/your-footprint-page/category-water.js";
import { CategoryElectricity } from "./pages/your-footprint-page/category-electricity.js";
import { CategoryFuels } from "./pages/your-footprint-page/category-fuels.js";
import { CategoryVehicles } from "./pages/your-footprint-page/category-vehicles.js";
import { CategoryMaterials } from "./pages/your-footprint-page/category-materials.js";
import { DisplayFootprint } from "./pages/your-footprint-page/display.js";
import { ImpactTracker } from "./pages/impact-tracker-page/impact.js";
import { Tips } from "./pages/tips-page/tips.js";

import { Leaderboard } from "./pages/leaderboard-page/leaderboard.js";
import { Resources } from "./pages/resources-page/resources.js";

import { Charities } from "./pages/charities-page/charities.js";
import { Donation } from "./pages/charities-page/donation.js";
import { Success } from "./pages/charities-page/success.js";
import { MyDonations } from "./pages/donations-made.js";

import { AdminHome } from "./admin/adminHome.js";
import { Users } from "./admin/users.js";

import { ReadPost } from "./pages/resources-page/read-post.js";
import { Blog } from "./admin/blog/blog.js";
import { ViewPosts } from "./admin/blog/view-post.js";
import { ReadPostAdmin } from "./admin/blog/read-post-admin.js";
import { OffsetProjects } from "./admin/projects/view-projects.js";
import { DonationInfo } from "./admin/donations/donations.js";
import { AdminLeaderboard } from "./admin/admin-leaderboard.js";
import { AdminTips } from "./admin/tips/view-tips.js";
import { ViewTip } from "./pages/tips-page/view-tip.js";
import { CategoryBusinessTrips } from "./pages/your-footprint-page/category-business.js";
import { Categories } from "./admin/footprint/category.js";

function App() {
  
  const [authState, setAuthState] = useState(true); //authState is a boolean 
  const [cookies, ] = useCookies(["access_token"]);

  useEffect(() => {
    if(cookies["access_token"])
    {
      console.log("hey");
      setAuthState(true);
    }
    else setAuthState(false);

  }, []);

  return (
    <AuthContext.Provider value={{authState, setAuthState}}>
    <div className="App">
      <Router>
        <Routes>
         <Route path="/" element={<Main />} />
         <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          

          <Route element={<PrivateRoutes /> }>
            <Route path="/select-user" element={<SelectUser/> } />
            <Route path="/home" element={<Home />} /> 
            <Route path="/your-footprint" element={<Footprint />} />
            <Route path="/impact-tracker" element={<ImpactTracker />} />

            <Route path="/tips" element={<Tips />} />
            <Route path="/view-tip" element={<ViewTip />} />

            <Route path="/charities" element={<Charities />} />
            <Route path="/donate" element={<Donation />} />
            <Route path="/success" element={<Success />} />
            <Route path="/my-donations" element={<MyDonations />} />

            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/read-post" element={<ReadPost />} />

            

            <Route path="/category-water" element={<CategoryWater />} />
            <Route path="/category-electricity" element={<CategoryElectricity />} />
            <Route path="/category-fuels" element={<CategoryFuels />} />
            <Route path="/category-vehicles" element={<CategoryVehicles />} />
            <Route path="/category-materials" element={<CategoryMaterials />} />
            <Route path="/category-business-trips" element={<CategoryBusinessTrips />} />
            <Route path="/display-footprint" element={<DisplayFootprint />} />

            <Route path="/admin-home" element={<AdminHome/>}/>
            <Route path="/user-info" element={<Users />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/view-posts" element={<ViewPosts />} />
            <Route path="/read-post-admin" element={<ReadPostAdmin />} />
            <Route path="/causes" element={<OffsetProjects />} />
            <Route path="/donation-info" element={<DonationInfo />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/admin-tips" element={<AdminTips />} />
            <Route path="/admin-leaderboard" element={<AdminLeaderboard />} />
          </Route>
          
        </Routes>
      </Router>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
