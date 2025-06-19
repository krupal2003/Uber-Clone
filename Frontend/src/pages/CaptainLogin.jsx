import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
  
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [captaindata, setCaptaindata] = useState({})
  
    const submithandler = (e) => {
      e.preventDefault();
      
      setCaptaindata({ email:email, password:password });
      // Here you can add the logic to handle login, like sending a request to your backend
      setEmail("");
      setPassword("");
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-19  mb-3' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s" alt="" />

        <form onSubmit={(e) => { submithandler(e) }}
        >
          <h3 className='text-lg font-medium mb-2'>What's Your Email ?</h3>
          <input type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='abc@example.com'
            className='bg-[#eeeeee] border  rounded-md px-4 py-2 w-full mb-7 text-lg placeholder:text-base'
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
        <p className='text-center'>New Captain? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>

      </div>

      <div >
        <Link to='/login' className='flex items-center justify-center bg-[#d5622d] text-white font-semibold  rounded-md px-4 py-2 w-full mb-3 text-lg '>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin