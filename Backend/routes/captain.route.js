const express=require('express');
const router=express.Router();
const {body}= require('express-validator');
const captainController=require('../controllers/captain.controller');

router.post('/register',
    [body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullName.firstName').isLength(3).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage('Vehicle type must be one of car, bike, or auto'),
    body('vehicle.vehicleNumber').isLength({ min: 1 }).withMessage('Vehicle number is required'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1')
    ],
    captainController.registerCaptain
)

router.post('/login',
    [body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')],
    captainController.loginCaptain
);



module.exports=router;