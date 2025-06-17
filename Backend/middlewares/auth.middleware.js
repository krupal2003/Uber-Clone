const jwt=require('jsonwebtoken');
const userModel= require('../models/userModel');
const bcrypt = require('bcrypt');
const blacklistTokenModel=require('../models/blacklistToken.model');
const captainModel=require('../models/captain.model');

module.exports.authUser=async (req,res,next)=>{

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).json({error: 'Unauthorized access, no token provided'});
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({error: 'Unauthorized access, token is blacklisted'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)
        
        if(!user) {
            return res.status(401).json({error: 'Unauthorized access, invalid token'});
        }

        req.user = user; // Attach user to request object
        next(); // Proceed to the next middleware or route handler
    }catch(err){
       return res.status(401).json({error: 'Unauthorized access, invalid token'});
    }
}

module.exports.authCaptain=async (req,res,next)=>{

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).json({error: 'Unauthorized access, no token provided'});    
    }
    const isBlacklisted = await blacklistTokenModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({error: 'Unauthorized access, token is blacklisted'});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id)
        
        if(!captain) {
            return res.status(401).json({error: 'Unauthorized access, invalid token1111'});
        }

        req.captain = captain; // Attach captain to request object
        next(); // Proceed to the next middleware or route handler
    }catch(err){
        return res.status(401).json({error: 'Unauthorized access, invalid token'})
    }
}