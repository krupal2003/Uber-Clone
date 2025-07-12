import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPannel from '../components/LocationSearchPannel';
import VehicalPannel from '../components/VehicalPannel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios';

const DashBoard = () => {

  const [pickup, setPickup] = useState("")
  const [destination, setDestination] = useState("")

  const [pickupDescription, setPickupDescription] = useState("");
  const [destinationDescription, setDestinationDescription] = useState("");


  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null); // "pickup" or "destination"
  const debounceRef = useRef();
  const [fare, setFare] = useState({})

  const [vehicalType, setVehicalType] = useState("")


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
        display: 'block',
        duration: 0.3
      })
    }
    else {
      gsap.to(confirmRideRef.current, {
        transform: 'translateY(100%)',
        display: "none",
        duration: 0.3
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
        display: 'block',
        duration: 0.3
      })
    }
    else {
      gsap.to(foundingDriverRef.current, {
        transform: 'translateY(100%)',
        display: "none",
        duration: 0.3
      })
    }
  }, [foundingDriverPannel])


  const fetchSuggestions = (value) => {
    clearTimeout(debounceRef.current);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/auto-suggetion`,
          {
            params: { input: value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }

        )

        setSuggestions(response.data || [])
      } catch (err) {
        console.error("Autocomplete fetch failed:", err);
        setSuggestions([]);
      }
    }, 300)
  }

  const handleInputChange = (field, value) => {
    setActiveField(field)

    if (field === "pickup") {
      setPickup(value)
    }
    else {
      setDestination(value)
    }

    fetchSuggestions(value);
  }

  const handleSuggestionClick = (place) => {
    if (activeField === "pickup") {
      setPickup(place.structured_formatting.main_text);
      setPickupDescription(place.structured_formatting.secondary_text)
    }
    if (activeField === "destination") {
      setDestination(place.structured_formatting.main_text);
      setDestinationDescription(place.structured_formatting.secondary_text)
    }
    setSuggestions([]);
  }

  async function findTrip() {
    setVehicalPannleOpen(true);
    setPannelOpen(false);

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`, { params: { pickup, destination }, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

      setFare(response.data);
    } catch (err) {
      res.status(404).json({ message: "can't get fare" })
    }


  }

  async function createRide(){
    
    const response= await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/createride`,{pickup,destination,vehicalType},{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    console.log(response.data)
  }



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
        <div className='h-[35%] p-5 bg-white relative'>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <i ref={pannelCloseRef} onClick={() => setPannelOpen(false)} className="ri-arrow-down-wide-fill w-8 text-2xl absolute right-6 top-7 opacity-0" ></i>
          <form onSubmit={(e) => submitHandler(e)} >
            <div className='line bg-gray-800 h-16 w-1 absolute top-25 left-[12%] rounded-full'></div>
            <input
              onFocus={() => { setActiveField("pickup") }}
              onClick={() => setPannelOpen(true)}
              value={pickup}
              onChange={(e) => handleInputChange("pickup", e.target.value)}
              className='bg-[#eee] text-lg py-2 px-12 w-full mt-5 rounded-md placeholder:text-base'
              type="text" placeholder='Enter pickup location'
            />
            <input
              onFocus={() => { setActiveField("pickup") }}
              onClick={() => setPannelOpen(true)}
              value={destination}
              onChange={(e) => handleInputChange("destination", e.target.value)}
              className='bg-[#eee] text-lg py-2 px-12 w-full mt-3 rounded-md placeholder:text-base'
              type="text"
              placeholder='Enter your destination'
            />
          </form>
          <button onClick={() => { findTrip() }} className='w-[90%] ml-5 rounded-md px-2 py-1 bg-black text-white font-medium text-lg mt-4'>
            Find Trip
          </button>
        </div>
        <div ref={pannelRef} className='bg-white h-0 '>
          <LocationSearchPannel
            suggestions={suggestions}
            onSelect={handleSuggestionClick}
          >
          </LocationSearchPannel>
        </div>
      </div>

      <div ref={vehicalPannleRef} className='fixed w-full translate-y-full bottom-0 z-10 px-3 py-6 bg-white' >
        <VehicalPannel fare={fare} setVehicalType={setVehicalType} setConfirmRideOpen={setConfirmRideOpen} setVehicalPannleOpen={setVehicalPannleOpen}>
        </VehicalPannel>
      </div>
      <div ref={confirmRideRef} className='fixed w-full translate-y-full bottom-0 z-10 px-3 py-6 bg-white' >
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          pickupDescription={pickupDescription}
          destinationDescription={destinationDescription}
          fare={fare}
          vehicalType={vehicalType}
          setConfirmRideOpen={setConfirmRideOpen}
          setFoundingDriverPannel={setFoundingDriverPannel}
        ></ConfirmRide>
      </div>
      <div ref={foundingDriverRef} className='fixed w-full translate-y-full bottom-0 z-10 px-3 py-6 bg-white' >
        <LookingForDriver 
          pickup={pickup}
          destination={destination}
          pickupDescription={pickupDescription}
          destinationDescription={destinationDescription}
          fare={fare}
          vehicalType={vehicalType}
          setFoundingDriverPannel={setFoundingDriverPannel}
        >
        </LookingForDriver>
      </div>


    </div>
  )
}

export default DashBoard