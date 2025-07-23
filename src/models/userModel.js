
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true, "Email is required"],
        trim: true,
        unique: [true, "User with this email already existed"],
        minLenght:[5, "Email must have atleast 5 characters"],
        lowercase:true

    },
    password:{
        type:String,
        required:[true, "Password is required"],
        trim:true,
        select: false,
    },
    verified:{
        type:Boolean,
        default:false,
    },
    verificationCode:{
        type:String,
        select:false
    },
    verificationCodeValidation:{
        type:Number,
        select:false
    },
    passwordRestCode:{
        type:String,
        select:false
    },
    passwordRestCodeValidation:{
        type:Number,
        select:false
    }
}, {timestamps:true})


export const TestUser = mongoose.model("User", userSchema)