const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please Enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter Validd Email"]
    },
    password: {
        type: String,
        required: [true, "please Enter password"],
        minlength: [8, "password must contain atleast 8 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role : {
        type : String,
        default : 'user'
    },
    resetPasswordToken : {
        type : String
    },
    resetPasswordExpire : {
        type : Date
    },
    deleted:{
        type : Boolean,
        default : false
    }
})
//hash password before save 
userSchema.pre('save' , async function (){
    if(this.isModified("password")){
        const salt =await bcrypt.genSalt(10)
        const secPass =await bcrypt.hash(this.password , salt)
        this.password = secPass
    }
})

//Generating JWT Token
userSchema.methods.getJwtToken = function() {
   return jwt.sign({id : this._id} , process.env.JWT_SECRET , { expiresIn : process.env.JWT_EXPIRE })
}

//Compare Password with hash
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password , this.password)
}

module.exports = mongoose.model('User' , userSchema);

