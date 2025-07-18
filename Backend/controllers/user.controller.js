const userModel=require('../models/userModel');
const {validationResult} =require('express-validator');
const userService=require('../services/user.service');
const blacklistToken=require('../models/blacklistToken.model');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser=async (req, res,next) => {
    // Validate request body
    // Assuming you have validation middleware set up
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {fullName,email,password} = req.body;

    const isUserExists = await userModel.findOne({email: email }); 
    if(isUserExists){
        return res.status(400).json({ error: "User with this email already exists" });
    }
    
    // Hash the password
    const hashPassword=await userModel.hashPassword(password);

    try{
        const user=await userService.createUser(fullName.firstName, fullName.lastName, email, hashPassword);
        const token = user.generateAuthToken();
        res.status(201).json({message:"user created succesfully", token ,user});
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports.loginUser=async (req, res,next) => {

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email,password}=req.body;

    try{
        const user=await userModel.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({error: 'Invalid credentials'});
        }

        const isMatch=await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({error: 'Invalid credentials'});
        }

        const token=user.generateAuthToken();
        res.cookie('token', token);
        res.status(200).json({message:"Login successful", token, user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Server error'});
    }
}

module.exports.getUserProfile=async(req,res,next)=>{
    res.status(200).json(req.user)
}

module.exports.logoutUser=async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        await blacklistTokenModel.create({ token });

        res.clearCookie('token'); // Clear the cookie
        res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}