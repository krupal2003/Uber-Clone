const { log } = require('console');
const rideModel = require('../models/ride.model');
const mapServices = require('../services/maps.services');
const crypto = require('crypto');

async function calcFare(pickup, destination) {

    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapServices.getDistanceAndTime(pickup, destination);

    const baseFare = {
        auto: 30,
        moto: 20,
        car: 50,
        xuv: 80
    };

    const perKmRate = {
        auto: 10,
        moto: 8,
        car: 15,
        xuv: 20
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5,
        xuv: 4
    };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto)),
        xuv: Math.round(baseFare.xuv + ((distanceTime.distance.value / 1000) * perKmRate.xuv) + ((distanceTime.duration.value / 60) * perMinuteRate.xuv)),
    };

    return fare;

}

module.exports.calcFare = calcFare;

function getOtp(digit) {
    const otp = crypto.randomInt(Math.pow(10, digit - 1), Math.pow(10, digit));
    return otp;
}


module.exports.createNewRide = async (userId, pickup, destination, vehicleType) => {

    if (!userId || !pickup || !destination || !vehicleType) {
        throw new Error("All fileds are required")
    }

    const fare = await calcFare(pickup, destination)

    const ride = rideModel.create({
        user: userId,
        pickup: pickup,
        destination: destination,
        fare: fare[vehicleType],
        otp: getOtp(6)
    })

    return ride;
}

module.exports.acceptRide = async (rideId, captainId) => {
    if (!rideId || !captainId) {
        throw new Error("Ride ID and Captain ID are required");
    }

    const updatedRide = await rideModel.findByIdAndUpdate(
        rideId,
        { captain: captainId, status: 'accepted' },
        { new: true }
    );
    if (!updatedRide) {
        throw new Error("Ride not found");
    }

    const ride = await rideModel.findById(rideId).populate('captain').populate('user').select('+otp');
    if (!ride) {
        throw new Error("Ride not found");
    }

    return ride;
}

module.exports.startRide = async (rideId, otp) => {
    if (!rideId || !otp) {
        throw new Error("Ride ID and OTP are required");
    }

    const ride = await rideModel.findById(rideId).populate('captain').populate('user').select('+otp');
    console.log("ride otp:", ride.otp);
    console.log("received otp:", otp);
    console.log("otp types:", typeof ride.otp, typeof otp);
    if (!ride) {
        throw new Error("Ride not found");
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== parseInt(otp)) {
        throw new Error('Invalid OTP');
    }


    ride.status = 'ongoing';
    await ride.save();

    return ride;
}

module.exports.finishRide = async (rideId) => {
    if (!rideId) {
        throw new Error("Ride ID is required");
    }

    const ride = await rideModel.findById(rideId).populate('captain').populate('user').select('+otp');
    if (!ride) {
        throw new Error("Ride not found");
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    ride.status = 'completed';
    await ride.save();

    return ride;
}