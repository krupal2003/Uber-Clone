import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
      <h5 onClick={() => {
        props.setRidePopUpPannel(false)
      }} className='absolute top-1 w-[90%] text-center'><i className='ri-arrow-down-wide-fill w-8 text-3xl text-gray-400'></i></h5>
      <h2 className='text-xl font-semibold mb-5 mt-3'>New Ride Available..!</h2>
      <div className='flex items-center justify-between py-2 px-3 bg-yellow-300 rounded-lg mb-2 '>
        <div className='flex items-center justify-start gap-4'>
          <img className='w-12 h-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2tc47ee1yuj0InnnL35xuHyr2dTsvjEti1Q&s" alt="" />
          <h5 className='text-lg font-semibold'>Tanya Sharma</h5>
        </div>
        <div className='text-center'>
          <h4 className='text-lg font-semibold'>2 km</h4>
          <p className='text-sm text-gray-700'>Away from you</p>
        </div>
      </div>
      <div className='flex flex-col items-center justify-between px-3 '>
        <div className='w-full '>
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
        <div className='flex items-center justify-between w-full mt-3 px-4 '>
          <button onClick={() => {
            props.setRidePopUpPannel(false)
          }}
            className='px-8 py-2 bg-gray-300 rounded-lg text-lg text-gray-800 font-semibold'>
            Ignore
          </button>
          <button onClick={() => {
            props.setRidePopUpPannel(false);
            props.setAcceptRidePannel(true);
          }}
            className='px-8 py-2 bg-green-700 rounded-lg text-lg text-white font-semibold'>
            Accept
          </button>

        </div>
      </div>
    </div>
  )
}

export default RidePopUp