import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignUp = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("");
  const [userdata, setuserData] = useState({});

  const submithandler = (e) => {
    e.preventDefault();
    setuserData(
      {
        fullName: {
          firstName: firstName,
          lastName: lastName
        },
        email: email,
        password: password
      });


    // Here you can add the logic to handle signup, like sending a request to your backend  
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
          <h3 className='text-lg w-full font-medium mb-2'>What's our Captain's Name ?</h3>
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

          <h3 className='text-lg font-medium mb-2'>What's Our Captain's Email ?</h3>
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
        <p className='text-center'>Already have account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>

      </div>

      <div >
        <p className='text-xs leading-tight'>We collect your location, ID, and contact details to match you with riders and manage trips. Your information is protected and shared only to support ride operations.</p>
      </div>
    </div>
  )
}

export default UserSignUp