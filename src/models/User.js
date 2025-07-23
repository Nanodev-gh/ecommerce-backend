import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required:true,
        select: false
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
}, {taimestamps:true})


export const User = mongoose.model("User", UserSchema)