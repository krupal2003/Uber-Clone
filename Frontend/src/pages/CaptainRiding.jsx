import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const CaptainRiding = () => {

    const [finishRidePannel, setfinishRidePannel] = useState(false)
    const finishRideRef = useRef(null)



    useGSAP(() => {
        if (finishRidePannel) {
            gsap.to(finishRideRef.current, {
                transform: 'translateY(0)',
            })
        }
        else {
            gsap.to(finishRidePannel.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [finishRidePannel])


    return (
        <div className='h-screen w-screen overflow-hidden '>
            <div className='fixed top-2 flex items-center justify-between p-4 w-full'>
                <img className='w-14 ' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link className='flex items-center justify-center bg-white w-10 h-10 rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-4/5'>
                <img className='h-full w-full object-cover' src="https://storage.googleapis.com/support-forums-api/attachment/thread-146048858-12639125651610213305.PNG" alt="" />
            </div>
            <div onClick={()=>{
                setfinishRidePannel(true)
            }} className='h-1/5 bg-yellow-400 flex justify-between items-center p-6'>
                <h4 className='text-xl font-semibold'>1 km away</h4>
                <button className='px-8 py-1 flex justify-center bg-green-700 rounded-lg text-lg text-white font-semibold'>Complete Ride</button>
            </div>
            <div ref={finishRideRef} className='fixed w-full translate-y-full h-screen bottom-0 z-10 px-3 py-6 bg-white' >
                <FinishRide ></FinishRide>
            </div>

        </div>
    )
}

export default CaptainRiding