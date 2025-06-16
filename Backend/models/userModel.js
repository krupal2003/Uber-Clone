const mongoose = require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({

    fullName:{
        firstName: {
            type: String,
            required: true,
            minlength:[3, "First name must be at least 3 characters long"],
        },
        lastName:{
            type: String,
            required: true,
            minlength:[3, "Last name must be at least 3 characters long"],
        }
    },
    email:{
        type:String,
        required: true,
        unique: true,   
        minlength:[5,"min length must be at least 5 characters"],
    },
    password:{
        type:String,
        required: true,
        select: false, // Do not return password in queries
    },
    socketId:{
        type: String,
        // default: null, // Default value for socketId
    }
})

userSchema.methods.generateAuthToken= function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.statics.hashPassword= async function (password) {
    return await bcrypt.hash(password, 10);
}


const userModel = mongoose.model("User", userSchema);
module.exports = userModel;