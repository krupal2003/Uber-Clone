import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import AcceptRide from '../components/AcceptRide'
import { useContext } from 'react'
import { DataCaptainContext } from '../context/CaptainContext'
import { SocketDataContext } from '../context/SocketContext'
import { useEffect } from 'react'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'

const CaptainHome = () => {

  const [ridePopUpPannel, setRidePopUpPannel] = useState(false)
  const ridePopUpRef = useRef(true)

  const [acceptRidePannel, setAcceptRidePannel] = useState(false)
  const acceptRidePanneRef = useRef(null)

  const { captain } = useContext(DataCaptainContext)
  const { socket } = useContext(SocketDataContext)

  const [ride, setride] = useState(null)

  useEffect(() => {
  socket.emit("join", { userType: "captain", userId: captain._id });

  let watchId;

  if (navigator.geolocation) {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        socket.emit("update-captain-location", {
          captainId: captain._id,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      },
      (error) => {
        console.error("Error watching location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }

  return () => {
    if (watchId) navigator.geolocation.clearWatch(watchId);
  };
}, [captain]);


  socket.on("new-ride", (data) => {
    setride(data)
    setRidePopUpPannel(true)
    // setAcceptRidePannel(false)
  });

  async function acceptRide() {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/accept-ride`, {
      rideId: ride._id,
      captainId: captain._id
      }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
      });
      // handle success if needed
    } catch (error) {
      console.error('Error accepting ride:', error);
      // handle error if needed
    }
  }

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
      <LiveTracking></LiveTracking>
      </div>
      <div>
        <CaptainDetails></CaptainDetails>
      </div>
      <div ref={ridePopUpRef} className='fixed w-full bottom-0 z-10 px-3 py-6 bg-white' >
        <RidePopUp ride={ride} 
        setRidePopUpPannel={setRidePopUpPannel} 
        setAcceptRidePannel={setAcceptRidePannel}
        acceptRide={acceptRide}
        ></RidePopUp>
      </div>
      <div ref={acceptRidePanneRef} className='fixed w-full translate-y-full h-screen bottom-0 z-10 px-3 py-6 bg-white' >
        <AcceptRide ride={ride} setRidePopUpPannel={setRidePopUpPannel}  setAcceptRidePannel={setAcceptRidePannel}></AcceptRide>
      </div>
    </div>
  )
}

export default CaptainHome