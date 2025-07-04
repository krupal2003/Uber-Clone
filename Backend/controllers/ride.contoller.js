const rideModel=require('../models/ride.model')
const rideServices=require('../services/ride.services')
const { validationResult } = require('express-validator');

module.exports.createRide= async(req,res,next)=> {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{

        const {pickup,destination,vehicalType}=req.body;
        const userId=req.user._id;

        const newRide=await rideServices.createNewRide(userId,pickup,destination,vehicalType)
        res.status(200).json(newRide)

    }catch(err){
        res.status(500).json({message:"internal server error"})
    }

}