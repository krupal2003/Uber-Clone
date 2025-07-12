import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { DataUserContext } from '../context/UserContext';


const UserSignUp = () => {
  
  const navigate= useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("");

  const {user,setUser}= useContext(DataUserContext);


  const submithandler = async(e) => {
    e.preventDefault();
    const newUser={
      fullName:{
        firstName:firstName,
        lastName:lastName
      },
      email:email,
      password:password
    }
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser);

    if(response.status===201){
      alert("User Created Successfully");
      localStorage.setItem("token", response.data.token);
      const user=response.data.user;
      setUser(user);
      navigate('/home');
    }
    
    setEmail("");
    setPassword("");  
    setFirstName("");
    setLastName("");  
  } 

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-14  mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

        <form onSubmit={(e) => {submithandler(e)}} 
        >
          <h3 className='text-lg font-medium mb-2'>What's Your Name ?</h3>
          <div className='mb-6 flex gap-3'>
            <input type="text"
              placeholder='First Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='bg-[#eeeeee] border rounded-md px-4 py-2 w-1/2 text-lg placeholder:text-base'
              required
            />
            <input type="text"
              placeholder='Last Name'
              value={lastName}        
              onChange={(e) => setLastName(e.target.value)}
              className='bg-[#eeeeee] border rounded-md px-4 py-2 w-1/2  text-lg placeholder:text-base'
              required
            />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's Your Email ?</h3>
          <input type="email"
            placeholder='abc@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] border rounded-md px-4 py-2 w-full mb-6 text-lg placeholder:text-base'
            required
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] border rounded-md px-4 py-2 w-full mb-6 text-lg placeholder:text-base'
            placeholder='password'
            required
          />

          <button className='bg-black text-white font-semibold  rounded-md px-4 py-2 w-full mb-3 text-lg '>Sign Up</button>
        </form>
        <p className='text-center'>Already have account? <Link to='/login' className='text-blue-600'>Login here</Link></p>

      </div>

      <div >
        <p className='text-xs leading-tight'>We use your location and contact details to provide safe and reliable rides. Your data is secure and only shared with trusted partners when needed.</p>
      </div>
    </div>
  )
}

export default UserSignUp