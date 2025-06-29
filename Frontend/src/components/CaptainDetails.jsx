import React from 'react'

const CaptainDetails = () => {
    return (
        <div className='h-2/5 p-6 w-full'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center justify-start gap-4'>
                    <img className='w-17 h-17 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw4RWcDN_O2n602TcxqD1avXYLNCWQ8v2ggw&s" alt="" />
                    <div>
                        <h4 className='text-lg font-medium'>Krupal Patel</h4>
                        <p className='text-sm text-gray-600'>White Ertiga zxi </p>
                    </div>
                </div>
                <div>
                    <h3 className='text-2xl font-semibold'>₹459.95</h3>
                    <p className='text-base font-gray-600'>Earning</p>
                </div>
            </div>
            <div className='flex justify-center items-center bg-gray-100 rounded-xl mt-8 p-3 gap-5'>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-time-line"></i>
                    <p className='text-lg font-medium'>10.2</p>
                    <h5 className='text-sm text-gray-600'>Hours Online</h5>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
                    <p className='text-lg font-medium'>10.2</p>
                    <h5 className='text-sm text-gray-600'>Hours Online</h5>
                </div>
                <div className='text-center'>
                    <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
                    <p className='text-lg font-medium'>10.2</p>
                    <h5 className='text-sm text-gray-600'>Hours Online</h5>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails