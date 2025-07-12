import React from 'react'

const LocationSearchPannel = ({
    suggestions,
    onSelect,
}) => {

    if (!suggestions.length)
        return (
            <p className="text-center py-4 text-gray-400">
                Start typing to see places…
            </p>
        );


    return (
        <div className="px-4 py-3">
            {suggestions.map((place) => (
                <div
                    key={place.place_id}
                    onClick={() => {
                        onSelect(place);
                    }}
                    className="flex gap-4 border border-gray-50 hover:border-black rounded-xl items-center justify-start px-2 py-3 mb-2 cursor-pointer active:bg-gray-100"
                >
                    <span className="bg-[#eee] w-6 h-6 flex items-center justify-center rounded-full">
                        <i className="ri-map-pin-2-fill text-lg"></i>
                    </span>

                    <div className="flex flex-col gap-2">
                        <h4 className="text-base font-medium leading-none">
                            {place.structured_formatting.main_text}
                        </h4>
                        <p className="text-sm leading-none text-gray-600">
                            {place.structured_formatting.secondary_text}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default LocationSearchPannel