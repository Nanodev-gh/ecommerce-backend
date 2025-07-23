import CryptoJS from "crypto-js";
import { User } from "../models/User.js";


export async function handleUserUpdate(req, res){
    const {body} = req
    const {id} = req.params
    if(body.password){
        body.password = CryptoJS.AES.encrypt(body.password, process.env.PASS_SEC).toString()
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {$set:body}, {new:true})
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


export async function handleUserDelete(req, res){
    const {id} = req.params
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({message:'User has been deleted'})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
    
}

export async function handleGetUser(req, res){
    const {id} = req.params
    try {
        const foundUser = await User.findById(id)
        if(!foundUser) return res.status(404).json({message:'User not'})
        res.status(200).json(foundUser)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
export async function handleGetUsers(req, res){
    try {
        const foundUser = await User.find()
        if(!foundUser) return res.status(404).json({message:'User not'})
        res.status(200).json(foundUser)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}
