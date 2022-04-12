const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Dish Name"]
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: [true, "Please Enter Price for MenuItem"],
        max: [200000, "MenuItem value can't exceed from 2 lac"]
    },
    diet:{
       type:String,
       required: [true, "Please Enter Diet"]
    },
    image:
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }

        },
    category: {
        type: String,
        required: [true, 'Please Enter Food Category']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    deleted:{
       type : Boolean,
       default : false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Menu' , menuSchema)