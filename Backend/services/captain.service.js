const userModel=require('../models/captain.model');


module.exports.captainService=async(firstName,lastName,email,password,color,vehicleNumber,vehicleType,capacity)=>{

    if(!firstName || !email || !password || !color || !vehicleNumber || !vehicleType || !capacity) {
        throw new Error('All fields are required');
    }

    const createCaptain = await userModel.create({
        fullName: {
            firstName: firstName,
            lastName: lastName
        },
        email: email,
        password: password,
        vehicle: {
            color: color,
            vehicleNumber: vehicleNumber,
            vehicleType: vehicleType,
            capacity: capacity
        }
    });

    return createCaptain;
}