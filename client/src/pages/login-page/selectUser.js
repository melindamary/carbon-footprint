import React, {useContext } from 'react'
import { UserContext } from '../../context/Context'
import { useNavigate } from 'react-router-dom'


export const SelectUser = () => {

    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div>
            {user === 'admin@gmail.com' && navigate("/admin-home")}
            {user!== 'admin@gmail.com' && navigate("/your-footprint")}
            
        </div>
    )
}

