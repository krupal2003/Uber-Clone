import React from 'react'

const WaitingForDriver = (props) => {
    return (
        <div>
            <h5 onClick={() => {props.setWaitingForDriver(false) }} className='absolute top-1 w-[90%] text-center'><i className='ri-arrow-down-wide-fill w-8 text-3xl text-gray-400'></i></h5>

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
                        <h4 className='text-lg'><i className="ri-map-pin-range-fill"></i></h4>
                        <div className='gap-1'>
                            <h3 className='text-base font-medium'>562/11-A</h3>
                            <p className='text-sm text-gray-600'>Kankariya Lake, Maninagar</p>
                        </div>
                    </div>
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
                </div>
            </div>
        </div>
    )
}

export default WaitingForDriver