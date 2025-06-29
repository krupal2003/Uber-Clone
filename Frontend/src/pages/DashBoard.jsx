import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPannel from '../components/LocationSearchPannel';
import VehicalPannel from '../components/VehicalPannel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const DashBoard = () => {

  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")

  const [pannelOpen, setPannelOpen] = useState(false)
  const pannelRef = useRef(null);
  const pannelCloseRef = useRef(null)

  const [vehicalPannleOpen, setVehicalPannleOpen] = useState(false);
  const vehicalPannleRef = useRef(null)

  const [confirmRideOpen, setConfirmRideOpen] = useState(false)
  const confirmRideRef = useRef(null)

  const [foundingDriverPannel, setFoundingDriverPannel] = useState(false)
  const foundingDriverRef = useRef(null)

  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const waitingForDriverRef = useRef(null)




  useGSAP(() => {
    if (pannelOpen) {
      gsap.to(pannelRef.current, {
        height: '70%',
        opacity: 1,
        y: 0,
        padding: 24
      })
      gsap.to(pannelCloseRef.current, {
        opacity: 1
      })
    }
    else {
      gsap.to(pannelRef.current, {
        height: '0%',
        padding: 0

      })
      gsap.to(pannelCloseRef.current, {
        opacity: 0
      })
    }
  }, [pannelOpen])

  useGSAP(() => {
    if (vehicalPannleOpen) {
      gsap.to(vehicalPannleRef.current, {
        transform: 'translateY(0)',
      })
    }
    else {
      gsap.to(vehicalPannleRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicalPannleOpen])

  useGSAP(() => {
    if (confirmRideOpen) {
      gsap.to(confirmRideRef.current, {
        transform: 'translateY(0)',
      })
    }
    else {
      gsap.to(confirmRideRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRideOpen])

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)',
      })
    }
    else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])

  useGSAP(() => {
    if (foundingDriverPannel) {
      gsap.to(foundingDriverRef.current, {
        transform: 'translateY(0)',
      })
    }
    else {
      gsap.to(foundingDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [foundingDriverPannel])


  const submitHandler = (e) => {
    e.preventDefault();
  }
  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-14 absolute top-5 left-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

      <div className='h-screen w-screen'>
        {/* temporary image */}
        <img className='h-full w-full object-cover' src="https://storage.googleapis.com/support-forums-api/attachment/thread-146048858-12639125651610213305.PNG" alt="" />
      </div>

      <div className=' h-screen flex flex-col justify-end absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <i ref={pannelCloseRef} onClick={() => setPannelOpen(false)} className="ri-arrow-down-wide-fill w-8 text-2xl absolute right-6 top-7 opacity-0" ></i>
          <form onSubmit={(e) => submitHandler(e)} >
            <div className='line bg-gray-800 h-16 w-1 absolute top-25 left-[12%] rounded-full'></div>
            <input
              onClick={() => setPannelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className='bg-[#eee] text-lg py-2 px-12 w-full mt-5 rounded-md placeholder:text-base'
              type="text" placeholder='Enter pickup location'
            />
            <input
              onClick={() => setPannelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className='bg-[#eee] text-lg py-2 px-12 w-full mt-3 rounded-md placeholder:text-base'
              type="text"
              placeholder='Enter your destination'
            />
          </form>
        </div>
        <div ref={pannelRef} className='bg-white h-0   '>
          <LocationSearchPannel setVehicalPannleOpen={setVehicalPannleOpen} setPannelOpen={setPannelOpen}></LocationSearchPannel>
        </div>
      </div>

      <div ref={vehicalPannleRef} className='fixed w-full translate-y-full bottom-0 z-10 px-3 py-6 bg-white' >
        <VehicalPannel setConfirmRideOpen={setConfirmRideOpen} setVehicalPannleOpen={setVehicalPannleOpen}></VehicalPannel>
      </div>
      <div ref={confirmRideRef} className='fixed w-full translate-y-full bottom-0 z-10 px-3 py-6 bg-white' >
        <ConfirmRide setConfirmRideOpen={setConfirmRideOpen} setFoundingDriverPannel={setFoundingDriverPannel}></ConfirmRide>
      </div>
      <div ref={foundingDriverRef} className='fixed w-full translate-y-full bottom-0 z-10 px-3 py-6 bg-white' >
        <LookingForDriver setFoundingDriverPannel={setFoundingDriverPannel}></LookingForDriver>
      </div>
      

    </div>
  )
}

export default DashBoard