const captainModel=require('../models/captain.model');
const captainService=require('../services/captain.service');
const {validationResult} = require('express-validator');

module.exports.registerCaptain  = async (req,res) => {

    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {fullName, email, password, vehicle} = req.body;

    const isCaptainExists = await captainModel.findOne({email: email });
    if(isCaptainExists){
        return res.status(400).json({ error: "Captain with this email already exists" });
    }

    const hashPassword = await captainModel.hashPassword(password);
    
    try {
        const captain = await captainService.captainService(
            fullName.firstName,
            fullName.lastName,
            email,
            hashPassword,
            vehicle.color,
            vehicle.vehicleNumber,
            vehicle.vehicleType,
            vehicle.capacity
        );
        
        const token=captain.generateAuthToken();
        res.status(201).json({ message: "Captain created successfully", token, captain });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }


}
