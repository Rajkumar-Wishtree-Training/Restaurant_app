const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.isAuthenticated = catchAsyncErrors(async (req , res , next) => {
    const {token} = req.cookies

    if(!token){
        return next(new ErrorHandler('Login Required to Acess this feature' , 401))
    }

    const decodedUser = jwt.verify(token , process.env.JWT_SECRET)
    // console.log(decodedUser);
    req.user =await User.findById(decodedUser.id)
    next()
})

exports.isAdmin = catchAsyncErrors(async (req , res , next) =>{
    if(req.user.role !== "admin"){
        return next(new ErrorHandler(`${req.user.role} do not have access to this Resourse`))
    }
    next()
})