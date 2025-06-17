const express=require('express');
const router=express.Router();
const {body}=require('express-validator')
const userController=require('../controllers/user.controller');
const userMiddleware=require('../middlewares/user.middleware');

router.post("/register",
   [body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
   ],userController.registerUser
)

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],userController.loginUser  
)

router.get('/profile',userMiddleware.authUser,userController.getUserProfile);
router.get('/logout', userMiddleware.authUser, userController.logoutUser);


module.exports=router;