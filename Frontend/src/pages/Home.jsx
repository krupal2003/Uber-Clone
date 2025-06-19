import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1659492659828-2d59f516bb81?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] pt-7  h-screen w-screen bg-red-100 flex justify-between flex-col'>
        <img className='w-14 ml-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div className='bg-white w-screen py-4 px-4 pb-7'>
          <h2 className='text-3xl font-bold'>Get Start With Uber</h2>
          <Link to='/login' className='flex items-center justify-center mt-5 bg-black  rounded text-white py-3 w-full'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Home