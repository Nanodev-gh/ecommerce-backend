import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title:{
        type:String,
        required:[true, "Post title is reqiured"],
        trim:true
    },
    decription:{
        type:String,
        required:[true, "Post description is reqiured"],
        trim:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

export const Post = mongoose.model("Post", postSchema)