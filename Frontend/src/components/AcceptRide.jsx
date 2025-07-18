import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const AcceptRide = (props) => {

    const [otp, setotp] = useState('')
    const navigate = useNavigate();

    async function submithandler(e) {
        e.preventDefault();
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setAcceptRidePannel(false)
            props.setRidePopUpPannel(false)
            navigate('/captain-riding', { state: { ride: response.data } })
        }

    }

    return (
        <div>
            <h5 onClick={() => {
                props.setAcceptRidePannel(false)
            }} className='absolute top-1 w-[90%] text-center'><i className='ri-arrow-down-wide-fill w-8 text-3xl text-gray-400'></i></h5>
            <h2 className='text-2xl font-semibold mb-6 mt-3'>Confirm this ride to start</h2>
            <div className='flex items-center justify-between py-2 px-3 bg-yellow-300 rounded-lg mb-5 '>
                <div className='flex items-center justify-start gap-4'>
                    <img className='w-12 h-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2tc47ee1yuj0InnnL35xuHyr2dTsvjEti1Q&s" alt="" />
                    <h5 className='text-lg font-semibold capitalize'>{props.ride?.user.fullName.firstName + " " + props.ride?.user.fullName.lastName}</h5>
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
                            <h3 className='text-base font-medium'>Pickup</h3>
                            <p className='text-sm text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-6 border-b border-gray-600 px-1 py-2'>
                        <h4 className='text-lg'><i className="ri-map-pin-2-fill"></i></h4>
                        <div className='gap-1'>
                            <h3 className='text-base font-medium'>Destination</h3>
                            <p className='text-sm text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-6  px-1 py-2'>
                        <h4 className='text-lg'><i className="ri-bank-card-fill"></i></h4>
                        <div className='gap-1'>
                            <h3 className='text-base font-medium text-green-700'>₹ {props.ride?.fare}</h3>
                            <p className='text-sm text-gray-600'>Cash</p>
                        </div>
                    </div>

                </div>

                <div className='mt-6 w-full'>
                    <form onSubmit={(e) => {
                        submithandler(e)
                    }}>
                        <input value={otp} onChange={(e) => { setotp(e.target.value) }}
                            type="text" className='bg-[#eee] text-lg py-2 px-4 w-full mb-5 font-mono rounded-md placeholder:text-lg'
                            placeholder='enter OTP'
                        />
                        <button type='submit'
                            className='w-full mt-3 px-1 py-2 flex justify-center bg-green-700 rounded-lg text-lg text-white font-semibold'>
                            Confirm
                        </button>
                        <button onClick={() => {
                            props.setAcceptRidePannel(false)
                        }}
                            className='w-full mt-2 px-1 py-2 bg-red-600 rounded-lg text-lg text-white font-semibold'>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AcceptRide