import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userdata, setuserData] = useState({})

  const submithandler = (e) => {
    e.preventDefault();
    
    setuserData({ email:email, password:password });
    // Here you can add the logic to handle login, like sending a request to your backend
    setEmail("");
    setPassword("");
  }


  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-14  mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

        <form onSubmit={(e) => { submithandler(e) }}
        >
          <h3 className='text-lg font-medium mb-2'>What's Your Email ?</h3>
          <input type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='abc@example.com'
            className='bg-[#eeeeee] border rounded-md px-4 py-2 w-full mb-7 text-lg placeholder:text-base'
            required
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] border rounded-md px-4 py-2 w-full mb-7 text-lg placeholder:text-base'
            placeholder='password'
            required
          />

          <button className='bg-black text-white font-semibold  rounded-md px-4 py-2 w-full mb-3 text-lg '>Login</button>
        </form>
        <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create Account</Link></p>

      </div>

      <div >
        <Link to='/captain-login' className='flex items-center justify-center bg-[#10b461] text-white font-semibold  rounded-md px-4 py-2 w-full mb-3 text-lg '>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin