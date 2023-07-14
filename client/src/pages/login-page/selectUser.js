import React, {useContext, useEffect } from 'react'
import { UserContext } from '../../context/Context'
import { useNavigate } from 'react-router-dom'


export const SelectUser = () => {

    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const useremail = (JSON.parse(localStorage.getItem("user"))).email;
    useEffect(() => {
        useremail === 'admin@gmail.com' ? navigate("/admin-home") : navigate("/your-footprint")
    }, []);

    return (
        <div>
            {/* {user === 'admin@gmail.com' && navigate("/admin-home")}
            {user!== 'admin@gmail.com' && navigate("/your-footprint")} */}
            
        </div>
    )
}

