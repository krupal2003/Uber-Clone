
import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
    return (
        <div className='h-screen overflow-hidden '>

            <Link to='/home' className='fixed top-3 right-4 w-10 h-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-xl font-medium ri-home-5-line"></i>
            </Link>
            <div className='h-[51%]'>
                <img className='h-full w-full object-cover' src="https://storage.googleapis.com/support-forums-api/attachment/thread-146048858-12639125651610213305.PNG" alt="" />
            </div>
            <div className='h-[49%] p-2'>
                <div className='flex items-center justify-between mt-3 px-4 py-2'>
                    <img className='h-14' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1743773253/assets/5e/8ce23d-35fa-425d-a7d2-08a2826d04bc/original/UberBlackXL.png" alt="" />
                    <div className='text-right'>
                        <h4 className='text-lg font-medium'>Krupal Patel</h4>
                        <h3 className='text-xl font-semibold -mt-1 -mb-1'>GJ 15 CP 5905</h3>
                        <p className='text-base text-gray-600'>White ertiga zxi</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-between px-3 py-2'>
                    <div className='w-full m-2'>
                        <div className='flex items-center gap-6 border-b border-gray-600 px-1 py-2'>
                            <h4 className='text-lg'><i className="ri-map-pin-2-fill"></i></h4>
                            <div className='gap-1'>
                                <h3 className='text-base font-medium'>592/12-B</h3>
                                <p className='text-sm text-gray-600'>Old high court, Navarangpura</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-6  px-1 py-2'>
                            <h4 className='text-lg'><i className="ri-bank-card-fill"></i></h4>
                            <div className='gap-1'>
                                <h3 className='text-base font-medium'>₹ 199.99</h3>
                                <p className='text-sm text-gray-600'>Cash</p>
                            </div>
                        </div>
                        <button className='w-full mt-4 px-3 py-2 bg-indigo-600 rounded-lg text-lg text-white font-semibold'>Make a payment</button>
                    </div>
                </div>
            </div>

            

        </div>
    )
}

export default Riding