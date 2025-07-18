import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SocketDataContext } from '../context/SocketContext';
import { useEffect } from 'react';

const WaitingForDriver = (props) => {
    const navigate = useNavigate();
    const {socket} =useContext(SocketDataContext);

     socket.on("ride-started", (data) => {
        props.setWaitingForDriver(false);
        
        navigate('/riding', { state: { ride: data } });
    });

    return (
        <div>
            <h5 onClick={() => {props.setWaitingForDriver(false) }} className='absolute top-1 w-[90%] text-center'><i className='ri-arrow-down-wide-fill w-8 text-3xl text-gray-400'></i></h5>
            <h2 className='text-xl font-semibold mb-3 mt-4 '>Driver is Arriving</h2>
            <div className='flex items-center justify-between mt-3 px-4 py-2'>
                <img className='h-14' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1743773253/assets/5e/8ce23d-35fa-425d-a7d2-08a2826d04bc/original/UberBlackXL.png" alt="" />
                <div className='text-right'>
                    <h4 className='text-lg font-medium capitalize'>{props.ride?.captain?.fullName.firstName + " " + props.ride?.captain?.fullName.lastName}</h4>
                    <h3 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain?.vehicle.vehicleNumber}</h3>
                    <p className='text-lg text-black font-semibold'>{props.ride?.otp}</p>
                </div>
            </div>
            <div className='flex flex-col items-center justify-between px-3 py-2'>
                <div className='w-full m-2'>
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
            </div>
        </div>
    )
}

export default WaitingForDriver