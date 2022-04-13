const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const ErrorHandler = require('../utils/errorhandler')
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken')
const {OAuth2Client}  = require('google-auth-library')

const clientId = process.env.GMAIL_CLIENT_ID
const client = new OAuth2Client(clientId)


//Register a User
exports.registerUser = catchAsyncErrors(async ( req , res , next) => {
    const {name , email , password , confirmPassword} = req.body;

    const isUserExist = await User.findOne({email , deleted :false})
    if(isUserExist){
        return next(new ErrorHandler("User Exist with given given email" ,400))
    }
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

    const user =await User.findOne({email , deleted : false}).select('+password')

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

//Get Single User Detail
exports.getUserDetail = catchAsyncErrors(async (req , res , next) =>{
    const user = await User.findById(req.user.id)
    if(!user){
        return next(new ErrorHandler(`User not Found` , 404))
    }
    res.status(200).json({
        success : true,
        user
    })
})

//Update / Change Password
exports.updatePassword = catchAsyncErrors( async(req , res , next) => {
    const user =  await User.findById(req.user.id).select('+password');
    if(!user){
        return next(new ErrorHandler('User not Found' , 404))
    }
    //Compare Password
    const isPasswordMatch = await user.comparePassword(req.body.oldPassword)

    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid Old Password" , 401))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("password and Confirm Password mismatched" , 401))
    }
    
    user.password = req.body.newPassword;
    await user.save()

    res.status(200).json({
        success : true
    })
})

//Update Profile
exports.updateProfile = catchAsyncErrors(async (req , res , next) => {
    const {name , email} = req.body;
    const user = await User.findByIdAndUpdate(req.user.id , {name , email} , {runValidators : true , new : true})
    //I will add cloudniry later
    await user.save();
    res.status(200).json({
        success : true,
    })
})

//Get All User --Admin
exports.getAllUsers = catchAsyncErrors(async (req , res , next) => {
    const users = await User.find({deleted : false});
    res.status(200).json({
        success : true , 
        users,
    })
})

//Get Single User Detail --Admin
exports.getSingleUserDetail = catchAsyncErrors(async (req , res , next) =>{
    const user = await User.findOne({_id : req.params.id , deleted : false})
    if(!user){
        return next(new ErrorHandler(`User not Exist with ID: ${req.params.id}` , 404))
    }
    res.status(200).json({
        success : true,
        user
    })
})

//Update User --Admin
exports.updateUser = catchAsyncErrors(async(req , res , next) => {
    const {role} = req.body;
       const user = await User.findOneAndUpdate({_id :req.params.id , deleted : false} , {role} , {runValidators : true , new : true})

       if(!user){
        return next(new ErrorHandler(`User not Exist with ID: ${req.params.id}` , 404))
       }
       await user.save();
       res.status(200).json({
           success : true,
       })
})

//Delete(soft) User --Admin
exports.deleteUser = catchAsyncErrors(async (req , res , next) =>{
    const user =await User.findOne({_id : req.params.id , deleted : false})

    if(!user){
        return next(new ErrorHandler(`User don't exist with ID: ${req.params.id}`))
    }
    user.deleted = true;
    await user.save()
    res.status(200).json({
        success : true,
        message : "User Delete Successfully"
    })
})

//Signin With Google
exports.userLoginWithGmail = catchAsyncErrors(async (req , res , next) => {
    const {token} = req.body;
    const response =await client.verifyIdToken({idToken : token , audience : clientId})
    const {email , email_verified} = response.payload ;
    //check email veried or not
    if(!email_verified){
        return next(new ErrorHandler('Gmail Login Failed' , 401))
    }
    const user = await User.findOne({email , deleted : false})
    if(!user){
        return next(new ErrorHandler('User login failed' , 400))
    }
    // console.log("Gmail Success");
    sendToken(user , 200 , res)
})