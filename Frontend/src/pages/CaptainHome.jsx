import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import AcceptRide from '../components/AcceptRide'

const CaptainHome = () => {

  const [ridePopUpPannel, setRidePopUpPannel] = useState(true)
  const ridePopUpRef = useRef(true)

  const [acceptRidePannel, setAcceptRidePannel] = useState(false)
  const acceptRidePanneRef = useRef(null)

  useGSAP(() => {
    if (ridePopUpPannel) {
      gsap.to(ridePopUpRef.current, {
        transform: 'translateY(0)',
      })
    }
    else {
      gsap.to(ridePopUpRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopUpPannel])

  useGSAP(() => {
    if (acceptRidePannel) {
      gsap.to(acceptRidePanneRef.current, {
        transform: 'translateY(0)',
      })
    }
    else {
      gsap.to(acceptRidePanneRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [acceptRidePannel])

  return (
    <div className='h-screen w-screen overflow-hidden '>

      <div className='fixed top-2 flex items-center justify-between p-4 w-full'>
        <img className='w-14 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link className='flex items-center justify-center bg-white w-10 h-10 rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://storage.googleapis.com/support-forums-api/attachment/thread-146048858-12639125651610213305.PNG" alt="" />
      </div>
      <div>
        <CaptainDetails></CaptainDetails>
      </div>
      <div ref={ridePopUpRef} className='fixed w-full bottom-0 z-10 px-3 py-6 bg-white' >
        <RidePopUp setRidePopUpPannel={setRidePopUpPannel} setAcceptRidePannel={setAcceptRidePannel}></RidePopUp>
      </div>
      <div ref={acceptRidePanneRef} className='fixed w-full translate-y-full h-screen bottom-0 z-10 px-3 py-6 bg-white' >
        <AcceptRide setAcceptRidePannel={setAcceptRidePannel}></AcceptRide>
      </div>
    </div>
  )
}

export default CaptainHome