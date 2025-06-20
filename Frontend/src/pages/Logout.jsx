import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Logout = () => {

    const navigation=useNavigate();

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/logout`,{
        headers:{
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then((response)=>{
        if(response.status === 200){
            // alert("Logout Successfully");
            localStorage.removeItem('token');
            navigation('/login')
        }
    })

  return (
    <div>Logout</div>
  )
}

export default Logout