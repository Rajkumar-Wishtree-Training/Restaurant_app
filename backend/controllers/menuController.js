const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Menu = require('../models/menuModel');
const ApiFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorhandler');
const cloudinary = require('cloudinary')

//Create Menu Item --Admin
exports.createMenuItem = catchAsyncErrors(async (req , res , next) =>{
    req.body.user = req.user.id;
    // console.log(req.body);
    const {name , price , category , diet , description , image , user} = req.body
    const myCloud = await cloudinary.v2.uploader.upload(image , {
        folder : 'MenuItems',
        width : 150,
        crop : "scale"
    })
    
    const menuItem =await Menu.create({
     name , price , category , diet , description, user ,
        image : {
            public_id : myCloud.public_id,
            url : myCloud.secure_url
        }
    });

    await menuItem.save()
  
    res.status(201).json({
        success : true,
        menuItem
    })
  
  })
//Get all Menu Items
exports.getAllMenuItems = catchAsyncErrors(async (req , res , next) =>{
    const resultPerPage = process.env.RESULT_PER_PAGE
    const totalResult =await Menu.countDocuments({deleted : false})
    const apiFeatures = new ApiFeatures(Menu.find({deleted : false}) , req.query)
    .search()
    .filter()
   
    let menuItems = await apiFeatures.query;

    let filteredProductCount = menuItems.length;

    apiFeatures.pagination(resultPerPage)

    menuItems =await apiFeatures.query.clone()

    res.status(200).json({
        success : true,
        totalResult,
        menuItems,
        resultPerPage,
        filteredProductCount
    })
})
//Get all Menu Items(Admin)
exports.getAdminMenuItems = catchAsyncErrors(async (req , res , next) =>{
    const totalResult =await Menu.countDocuments({deleted : false})
   const menuItems = await Menu.find({deleted : false})

    res.status(200).json({
        success : true,
        totalResult,
        menuItems,
    })
})

//Update Menu Item -- Admin
exports.updateMenuItem = catchAsyncErrors(async (req , res , next) => {
    let menu = await Menu.findById(req.params.id)
    if(!menu){
        return next(new ErrorHandler(`Menu not found with Given Id : ${req.params.id}`))
    }

    menu = await Menu.findByIdAndUpdate(req.params.id , req.body , { runValidators : true , new : true})

    await menu.save()

    res.status(200).json({
        success : true,
        menu
    })
})

//Delete(Soft) Menu Item --Admin
exports.deleteMenuItem = catchAsyncErrors(async (req , res , next) => {
    // console.log(req.params.id);
    let menu = await Menu.findOne({_id : req.params.id , deleted : false})
    // console.log(menu);
    if(!menu){
        return next(new ErrorHandler(`Menu not found with Given Id : ${req.params.id}`))
    }

    menu = await Menu.findByIdAndUpdate(req.params.id , {deleted : true} , { runValidators : true , new : true})

    await menu.save()

    res.status(200).json({
        success : true,
        message : "Menu Deleted Successfully"
    })
})