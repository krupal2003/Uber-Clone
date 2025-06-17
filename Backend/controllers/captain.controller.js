const captainModel=require('../models/captain.model');
const captainService=require('../services/captain.service');
const {validationResult} = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

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

module.exports.loginCaptain = async (req, res) => { 

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;

    try{
        const captain = await captainModel.findOne({email}).select('+password');
        if(!captain){
            return res.status(401).json({error: 'Invalid credentials'});
        }
        const isMatch = await captain.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({error: 'Invalid credentials'});
        }
        const token = captain.generateAuthToken();
        res.cookie('token', token) ;
        res.status(200).json({message: "Login successful", token, captain});
    }catch(err){
            res.status(500).json({ error: 'Server error' });
    }
}

module.exports.getCaptainProfile=async (req,res)=>{
    try{
        res.status(200).json(req.captain)
    }catch(err){
        console.log(err);
        res.status(500).json({error:"server error"})
    }
}

module.exports.logoutCaptain = async (req, res) => {
    try{
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        await blacklistTokenModel.create({ token });

        res.clearCookie('token'); // Clear the cookie
        res.status(200).json({ message: 'Logout successful' });
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Server error'});
    }
}