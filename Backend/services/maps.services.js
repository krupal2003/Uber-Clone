const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddresCordinates = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const results = response.data.results;
        if (results && results.length > 0) {
            const location = results[0].geometry.location;
            return {
                lng: location.lng,
                ltd: location.lat
            };
        } else {
            throw new Error('No results found for the given address.');
        }
    } catch (error) {
        throw new Error('Failed to fetch coordinates: ' + error.message);
    }
}

module.exports.getDistanceAndTime= async (origin, destination) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const encodedOrigin = encodeURIComponent(origin);
    const encodedDestination = encodeURIComponent(destination);
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodedOrigin}&destinations=${encodedDestination}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const rows = response.data.rows;
        if (rows && rows.length > 0 && rows[0].elements && rows[0].elements.length > 0) {
            const element = rows[0].elements[0];
            if (element.status === "OK") {
            return element;
            } else if (element.status === "ZERO_RESULTS") {
            throw new Error('No results found between the given origin and destination.');
            } else {
            throw new Error(`Error from Google Maps API: ${element.status}`);
            }
        } else {
            throw new Error('No data found for the given origin and destination.');
        }
    } catch (error) {
        throw new Error('Failed to fetch distance and time: ' + error.message);
    }
}

module.exports.getAutoCompleteSuggetion=async(input)=>{
    const apiKey = process.env.GOOGLE_MAPS_API;
    const encodedInput = encodeURIComponent(input);
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodedInput}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data && response.data.predictions) {
            return response.data.predictions;
        } else {
            throw new Error('No autocomplete suggestions found.');
        }
    } catch (error) {
        throw new Error('Failed to fetch autocomplete suggestions: ' + error.message);
    }
}

module.exports.getCaptainInRadius= async (ltd,lng,radius) => {
     const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd,lng ], radius / 6371 ]
            }
        }
    });
    return captains;
}
