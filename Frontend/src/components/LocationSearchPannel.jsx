import React from 'react'

const LocationSearchPannel = (props) => {

    const location = [
        {
            locationName: "2d Sqaure,New CG Road",
            address: "near visat cross road,Chandkheda"
        },
        {
            locationName: "3d Sqaure,New CG Road",
            address: "near visat cross road,Chandkheda"
        },
        {
            locationName: "4d Sqaure,New CG Road",
            address: "near visat cross road,Chandkheda"
        },
        {
            locationName: "5d Sqaure,New CG Road",
            address: "near visat cross road,Chandkheda"
        }
    ]
    return (
        <div>
            {
                location.map((elm, index) => {
                    return (
                        <div key={index}
                            onClick={() => { 
                                props.setVehicalPannleOpen(true);
                                props.setPannelOpen(false)
                             }}
                            className='flex gap-4 border border-gray-50 active:border-black rounded-xl items-center justify-start px-1 py-2 mb-2'>
                            <h2 className='bg-[#eee] w-6 h-6 p-4 flex items-center justify-center rounded-full'>
                                <i className="ri-map-pin-2-fill text-2xl"></i>
                            </h2>
                            <div className='flex flex-col' >
                                <h4 className='text-base font-medium'>{elm.locationName}</h4>
                                <p className='text-sm' >{elm.address}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default LocationSearchPannel