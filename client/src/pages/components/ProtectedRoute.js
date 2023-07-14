import React, { useContext, useState, useEffect } from 'react'
import {Outlet, Navigate} from "react-router-dom";
import { AuthContext, UserContext } from '../../context/Context';
import { Login } from '../login-page/login';

function PrivateRoutes() {

  const {authState} = useContext(AuthContext);
  console.log(authState);

  const [user, setUser] = useState("");

  useEffect(() => {
    console.log(authState);
    if(authState===true)
    {
      const userinfo = JSON.parse(localStorage.getItem("user"));
      setUser(userinfo.email);
      console.log(user);
    }
  }, []);
 
  return (

    authState ? <UserContext.Provider value={{user, setUser}}><Outlet/></UserContext.Provider> : <Login />
  )
}

export default PrivateRoutes;