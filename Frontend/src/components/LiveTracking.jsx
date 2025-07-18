import React, { useState, useEffect } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(center);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let watchId;
        
        if (navigator.geolocation) {
            // First, get current position immediately
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({
                        lat: latitude,
                        lng: longitude
                    });
                    setIsLoading(false);
                },
                (error) => {
                    console.error("Error getting initial position:", error);
                    setError(error.message);
                    setIsLoading(false);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );

            // Then watch for position changes
            watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({
                        lat: latitude,
                        lng: longitude
                    });
                    setError(null);
                },
                (error) => {
                    console.error("Error watching position:", error);
                    setError(error.message);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 5000,
                    timeout: 10000
                }
            );
        } else {
            setError("Geolocation is not supported by this browser");
            setIsLoading(false);
        }

        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-2 text-sm text-gray-600">Loading location...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center text-red-600">
                    <p className="text-sm">Location Error: {error}</p>
                    <p className="text-xs mt-1">Please enable location access</p>
                </div>
            </div>
        );
    }

    return (
        <LoadScript 
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            onError={(error) => {
                console.error("Google Maps API error:", error);
                setError("Failed to load Google Maps");
            }}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}
                options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                }}
            >
                {/* Using default marker - no custom icon */}
                <Marker position={currentPosition} />
            </GoogleMap>
        </LoadScript>
    )
}

export default LiveTracking