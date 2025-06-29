import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DataCaptainContext } from '../../context/CaptainContext';
import axios from 'axios';

const UserSignUp = () => {

  const navigator = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("");

  const [color, setColor] = useState("");
  const [vehicalType, setVehicalType] = useState("");
  const [vehicalNumber, setVehicalNumber] = useState("");
  const [capacity, setCapacity] = useState("");

  const {captain, setCaptain} = useContext(DataCaptainContext)


  const submithandler = async(e) => {
    e.preventDefault();
    
    const captainData = {
      fullName: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: color,
        vehicleType: vehicalType,
        vehicleNumber: vehicalNumber,
        capacity: capacity
      }
    }

    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

    if (response.status === 200) {
      setCaptain(response.data.captain);
      localStorage.setItem("token", response.data.token);
      navigator("/captain-home");
    }  

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-19  mb-3' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s" alt="" />
        <form onSubmit={(e) => { submithandler(e) }}
        >
          <h3 className='text-base w-full font-medium mb-2'>What's our Captain's Name ?</h3>
          <div className='mb-6 flex gap-3'>
            <input type="text"
              placeholder='First Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='bg-[#eeeeee] border rounded-md px-4 py-2 w-1/2 text-base placeholder:text-sm'
              required
            />
            <input type="text"
              placeholder='Last Name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className='bg-[#eeeeee] border rounded-md px-4 py-2 w-1/2  text-base placeholder:text-sm'
              required
            />
          </div>

          <h3 className='text-base font-medium mb-2'>What's Our Captain's Email ?</h3>
          <input type="email"
            placeholder='abc@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] border rounded-md px-4 py-2 w-full mb-6 text-base placeholder:text-sm'
            required
          />

          <h3 className='text-base font-medium mb-2'>Enter Password</h3>
          <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] border rounded-md px-4 py-2 w-full mb-6 text-base placeholder:text-sm'
            placeholder='password'
            required
          />

          <h3 className='text-base font-medium mb-2 '>Vehicle Information</h3>
          <div className='mb-6 flex gap-3'>
            <select
              value={vehicalType}
              onChange={(e) => setVehicalType(e.target.value)}
              className='bg-[#eeeeee] border rounded-md px-4 py-2 w-1/2 text-base placeholder:text-sm'
              required
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="auto">Auto</option>
            </select>
            <select
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className='bg-[#eeeeee] border rounded-md px-4 py-2 w-1/2 text-base placeholder:text-sm'
              required
            >
              <option value=""  disabled>Select Capacity</option>
              <option value="1">1</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="6">6</option>
            </select>
          </div>
          <div className='mb-6 flex gap-3'>
            <input
              type="text"
              placeholder="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className='bg-[#eeeeee] border rounded-md px-4 py-2 w-1/2 text-base placeholder:text-sm'
              required
            />
             <input
              type="text"
              placeholder="Vehicle Number"
              value={vehicalNumber}
              onChange={(e) => setVehicalNumber(e.target.value)}
              className='bg-[#eeeeee] border rounded-md px-4 py-2 w-1/2 text-base placeholder:text-sm'
              required
            />
            
          </div>

          <button className='bg-black text-white font-semibold  rounded-md px-4 py-2 w-full mb-3 text-lg '>Sign Up</button>
        </form>
        <p className='text-center'>Already have account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>

      </div>

      {/* <div >
        <p className='text-xs leading-tight'>We collect your location, ID, and contact details to match you with riders and manage trips. Your information is protected and shared only to support ride operations.</p>
      </div> */}
    </div>
  )
}

export default UserSignUp