const express=require('express')
const router=express.Router();
const authmiddleware=require('../middlewares/auth.middleware')
const rideController=require('../controllers/ride.contoller')
const { body } = require('express-validator');

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



module.exports=router;