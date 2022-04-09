const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const Menu = require('../models/menuModel');
const ApiFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorhandler');

//Create Menu Item --Admin
exports.createMenuItem = catchAsyncErrors(async (req , res , next) =>{
    req.body.user = req.user.id;
    const menuItem =await Menu.create(req.body);

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