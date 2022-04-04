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
    const user = await User.findOne({_id : decodedUser.id , deleted : false})
    if(!user){
        return next(new ErrorHandler('UnAuthorized User' , 401))
    }
    req.user = user
    next()
})

exports.isAdmin = catchAsyncErrors(async (req , res , next) =>{
    if(req.user.role !== "admin"){
        return next(new ErrorHandler(`${req.user.role} do not have access to this Resourse`))
    }
    next()
})