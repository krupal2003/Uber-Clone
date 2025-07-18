const mongooes = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongooes.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"],
        },
        lastName: {
            type: String,
            required: true,
            minlength: [3, "Last name must be at least 3 characters long"],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "min length must be at least 5 characters"],
        match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
        select: false, // Do not return password in queries
    },
    socketId: {
        type: String,
        // default: null, // Default value for socketId
    },

    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive', 'banned'], // Example statuses
        default: 'inactive', // Default status
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 characters long"],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto'], // Example vehicle types
        },
        vehicleNumber: {
            type: String,
            required: true,
            unique: true, // Ensure vehicle number is unique
            // match: [/^[A-Z0-9-]{6,15}$/, "Please enter a valid vehicle number"],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"],
        },

    },

    // location: {
    //     type: {
    //         type: String,
    //         enum: ['Point'],
    //         default: 'Point'
    //     },
    //     coordinates: {
    //         type: [Number], // [lng, lat]
    //     }
        
    // }
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})

captainSchema.index({ location: '2dsphere' });


captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Token expires in 1 hour
    );
    return token;
}

captainSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds        
    return await bcrypt.hash(password, salt); // Hash the password with the salt
}

const captainModel = mongooes.model("Captain", captainSchema);

module.exports = captainModel;