const express=require('express')
const router=express.Router();
const authmiddleware=require('../middlewares/auth.middleware')
const rideController=require('../controllers/ride.contoller')
const { body ,query } = require('express-validator');

router.post(
    '/createride',
    [
        body('pickup').notEmpty().withMessage('Pickup location is required'),
        body('destination').notEmpty().withMessage('destinatiom location is required'),
        body('vehicalType').isIn(["moto","car","auto","xuv"]).withMessage('Valid vehicalType is required')
    ],
    authmiddleware.authUser,
    rideController.createRide
)

router.get(
    "/get-fare",
    [
        query('pickup').notEmpty().withMessage('Pickup location is required'),
        query('destination').notEmpty().withMessage('Destination location is required')
    ],authmiddleware.authUser,
    rideController.getFare
)

router.post('/accept-ride',
    [
        body('rideId').notEmpty().withMessage('Ride ID is required'),
        body('captainId').notEmpty().withMessage('Captain ID is required')
    ],
    authmiddleware.authCaptain,
    rideController.acceptRide
)

router.get('/start-ride',
    [
        query('rideId').notEmpty().withMessage('Ride ID is required'),
        query('otp').notEmpty().withMessage('OTP is required')
    ],
    authmiddleware.authCaptain,
    rideController.startRide
)

router.get('/finish-ride',
    [
        query('rideId').notEmpty().withMessage('Ride ID is required'),
    ],
    authmiddleware.authCaptain,
    rideController.finishRide
)

module.exports=router;