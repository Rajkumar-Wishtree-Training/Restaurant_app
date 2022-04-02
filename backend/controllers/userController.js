const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const ErrorHandler = require('../utils/errorhandler')
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken')

//Register a User
exports.registerUser = catchAsyncErrors(async ( req , res , next) => {
    const {name , email , password , confirmPassword} = req.body;
    //Check password and Confirm password
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password and Confirm Password Mismatch" , 400))
    }

    const user = await User.create({
        name , email , password,
        avatar : {
            public_id : "this is public id",
            url : "user profile pic url"
        }
    })
    sendToken(user , 201 , res)
   
})

//Login User
exports.loginUser = catchAsyncErrors(async (req , res , next) => {
    const {email , password} = req.body
    
    if(!email || !password){
        return next(new ErrorHandler('Please Enter Email and Password!', 400))
    }

    const user =await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('Invalid Email or Password' , 400))
    }

    const isPasswordMatch =await user.comparePassword(password)

    if(!isPasswordMatch){
        return next(new ErrorHandler('Invalid Email or Password' , 400))
    }
   
   sendToken(user , 200 , res)
})

//Logout user
exports.logoutUser = catchAsyncErrors(async (req , res , next) => {
    res.cookie('token' , null , {
        expires : new Date(Date.now()),
        httpOnly : true
    })

    res.status(200).json({
        success : true,
        message : "Loged Out"
    })
})