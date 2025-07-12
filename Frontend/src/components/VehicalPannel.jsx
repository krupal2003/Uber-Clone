import React from 'react'

const VehicalPannel = (props) => {
    return (
        <div>
            <h5 onClick={() => { props.setVehicalPannleOpen(false) }} className='absolute top-1 w-[90%] text-center'><i className='ri-arrow-down-wide-fill w-8 text-3xl text-gray-400'></i></h5>
            <h2 className='text-xl font-semibold mb-3 mt-3 '>Choose Your Ride</h2>
            <div onClick={() => {
                props.setVehicalType("car")
                props.setConfirmRideOpen(true);
                props.setVehicalPannleOpen(false)
            }} className='flex w-full mb-1 items-center border border-transparent active:border-black rounded-xl justify-between p-3'>
                <img className='h-13' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1682350473/assets/97/e2a99c-c349-484f-b6b0-3cea1a8331b5/original/UberBlack.png" alt="" />
                <div className='ml-5 w-1/2'>
                    <h4 className='text-base font-medium'>UberGo <span><i className="ri-user-fill"></i>4</span></h4>
                    <h5 className='text-sm font-medium'>2 mins away</h5>
                    <p className='text-sm font-normal text-gray-700'>Affortable, compact rides</p>
                </div>
                <h2 className='text-xl font-semibold'>₹{props.fare.car}</h2>
            </div>
            <div onClick={() => {
                props.setVehicalType("moto")
                props.setConfirmRideOpen(true);
                props.setVehicalPannleOpen(false)
            }} className='flex w-full mb-1 items-center border border-transparent active:border-black box-border rounded-xl justify-between p-3'>
                <img className='h-13' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                <div className='ml-5 w-1/2'>
                    <h4 className='text-base font-medium'>Moto <span><i className="ri-user-fill"></i>1</span></h4>
                    <h5 className='text-sm font-medium'>3 mins away</h5>
                    <p className='text-sm font-normal text-gray-700'>Affortable, moto rides</p>
                </div>
                <h2 className='text-xl font-semibold'>₹{props.fare.moto}</h2>
            </div>
            <div onClick={() => {
                props.setVehicalType("xuv")
                props.setConfirmRideOpen(true);
                props.setVehicalPannleOpen(false)
            }} className='flex w-full mb-1 items-center border border-transparent active:border-black rounded-xl justify-between p-3'>
                <img className='h-13' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1568134115/assets/6d/354919-18b0-45d0-a151-501ab4c4b114/original/XL.png" alt="" />
                <div className='ml-5 w-1/2'>
                    <h4 className='text-base font-medium'>UberXL <span><i className="ri-user-fill"></i>6</span></h4>
                    <h5 className='text-sm font-medium'>5 mins away</h5>
                    <p className='text-sm font-normal text-gray-700'>Comfortable, xuv rides</p>
                </div>
                <h2 className='text-xl font-semibold'>₹{props.fare.xuv}</h2>
            </div>
            <div onClick={() => {
                props.setVehicalType("auto")
                props.setConfirmRideOpen(true);
                props.setVehicalPannleOpen(false)
            }} className='flex w-full  items-center border border-transparent active:border-black rounded-xl justify-between p-3'>
                <img className='h-13' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                <div className='ml-5 w-1/2'>
                    <h4 className='text-base font-medium'>Auto <span><i className="ri-user-fill"></i>3</span></h4>
                    <h5 className='text-sm font-medium'>1 mins away</h5>
                    <p className='text-sm font-normal text-gray-700'>Affortable, auto rides</p>
                </div>
                <h2 className='text-xl font-semibold'>₹{props.fare.auto}</h2>
            </div>
        </div>
    )
}

export default VehicalPannel