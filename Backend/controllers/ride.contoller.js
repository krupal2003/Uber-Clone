const rideModel = require('../models/ride.model')
const rideServices = require('../services/ride.services')
const { validationResult } = require('express-validator');
const mapsServices = require('../services/maps.services');
const socket = require('../socket');

module.exports.createRide = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { pickup, destination, vehicalType } = req.body;
        const userId = req.user._id;

        const newRide = await rideServices.createNewRide(userId, pickup, destination, vehicalType)

        const pickupCordinates = await mapsServices.getAddresCordinates(pickup);
        // console.log(pickupCordinates);

        const captainsInRadius = await mapsServices.getCaptainInRadius(pickupCordinates.ltd, pickupCordinates.lng, 2);

        newRide.otp = "";

        const rideWithUser = await rideModel.findById(newRide._id).populate('user');

        captainsInRadius.map((captain) => {
            const message = {
                event: "new-ride",
                data: rideWithUser
            };
            socket.sendMessageToSocket(captain.socketId, message);
        })

        res.status(200).json(newRide)


    } catch (err) {
        res.status(500).json({ message: "internal server error" })
    }

}

module.exports.getFare = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { pickup, destination } = req.query;

        const fare = await rideServices.calcFare(pickup, destination)
        res.status(200).json(fare)
    } catch (err) {
        res.status(500).json({ message: "internal server error" })
    }
}

module.exports.acceptRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { rideId, captainId } = req.body;

        const ride = await rideServices.acceptRide(rideId, captainId);

        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        socket.sendMessageToSocket(ride.user.socketId, {
            event: "ride-accepted",
            data: ride
        });

        res.status(200).json(ride);

    } catch (err) {
        res.status(500).json({ message: "internal server error" })
    }
}

module.exports.startRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { rideId, otp } = req.query;


        const ride = await rideServices.startRide(rideId, otp);
        console.log("ride started:", ride);
        socket.sendMessageToSocket(ride.user.socketId, {
            event: "ride-started",
            data: ride
        });

        res.status(200).json(ride);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" })
    }
}

module.exports.finishRide = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { rideId } = req.query;

        const ride = await rideServices.finishRide(rideId);

        socket.sendMessageToSocket(ride.user.socketId, {
            event: "ride-finished",
            data: ride
        });

        res.status(200).json({ message: "Ride finished successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" })
    }
}