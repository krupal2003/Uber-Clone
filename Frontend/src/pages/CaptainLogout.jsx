import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
     const navigation=useNavigate();

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/captains/logout`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then((response)=>{
        if(response.status === 200){
            // alert("Logout Successfully");
            localStorage.removeItem('token');
            navigation('/captain-login')
        }
    })

  return (
    <div>Logout</div>
  )
}

export default CaptainLogout