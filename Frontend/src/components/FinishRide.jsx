import axios from 'axios';
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const FinishRide = (props) => {

   const navigate = useNavigate();

    async function submithandler(e) {
        e.preventDefault();
        // Handle form submission logic here
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/finish-ride`, {
            params: {
                rideId: props.rideData._id
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status === 200) {
            
            // Navigate to the captain riding page with the ride data
            navigate('/captain-home')
        }
    }
    return (
        <div>
            <h5 onClick={() => {
                props.setAcceptRidePannel(false)
            }} className='absolute top-1 w-[90%] text-center'><i className='ri-arrow-down-wide-fill w-8 text-3xl text-gray-400'></i></h5>
            <h2 className='text-2xl font-semibold mb-6 mt-3'>Finish this Ride</h2>
            <div className='flex items-center justify-between py-2 px-3 border-2 border-yellow-300 rounded-lg mb-5 '>
                <div className='flex items-center justify-start gap-4'>
                    <img className='w-12 h-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2tc47ee1yuj0InnnL35xuHyr2dTsvjEti1Q&s" alt="" />
                    <h5 className='text-lg font-semibold'>{props.rideData?.user.fullName.firstName + " " + props.rideData?.user.fullName.lastName}</h5>
                </div>
                <div className='text-center'>
                    <h4 className='text-lg font-semibold'>2 km</h4>
                    <p className='text-sm text-gray-700'>Away from you</p>
                </div>
            </div>
            <div className='flex flex-col items-center justify-between px-3 '>
                <div className='w-full mb-3  '>
                    <div className='flex items-center gap-6 border-b border-gray-600 px-1 py-2'>
                        <h4 className='text-lg'><i className="ri-map-pin-range-fill"></i></h4>
                        <div className='gap-1'>
                            <h3 className='text-base font-medium'>Pickup From</h3>
                            <p className='text-sm text-gray-600'>{props.rideData?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-6 border-b border-gray-600 px-1 py-2'>
                        <h4 className='text-lg'><i className="ri-map-pin-2-fill"></i></h4>
                        <div className='gap-1'>
                            <h3 className='text-base font-medium'>Drop At</h3>
                            <p className='text-sm text-gray-600'>{props.rideData?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-6  px-1 py-2'>
                        <h4 className='text-lg'><i className="ri-bank-card-fill"></i></h4>
                        <div className='gap-1'>
                            <h3 className='text-base font-medium text-green-700'>₹ {props.rideData?.fare}</h3>
                            <p className='text-sm text-gray-600'>Cash</p>
                        </div>
                    </div>
                </div>

                <div className='mt-6 w-full'>
                    <button onClick={(e) => { submithandler(e) }}
                        type='submit'
                        className='w-full mt-3 px-1 py-2 flex justify-center bg-green-700 rounded-lg text-lg text-white font-semibold'>
                        Finish Ride
                    </button>
                    <p className='mt-5 text-red-500 text-sm'>click on finish ride if payment is done*</p>
                </div>
            </div>
        </div>
    )
}

export default FinishRide