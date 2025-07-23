import { Router } from "express";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { validateLogin, validateUser } from "../middlewares/validator.js";
import { User } from "../models/User.js";

const router = Router()

// Register
router.post("/register", validateUser, async (req, res)=>{
    let { username, email, password } = req.body;

     password = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({username,email, password});

    try {
        const savedUser = await newUser.save()
        const { password: _, ...userWithoutPassword } = savedUser._doc;
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: "Error saving user", error: error.message });
    }
    
})

router.post("/login", validateLogin, async (req, res)=>{
    try {
        const { email, password } = req.body;
        // Check if user exists
        const foundUser = await User.findOne({ email }).select("+password");
        if (!foundUser) return res.status(404).json({ message: "Wrong credentials!" });

        // Decrypt password and compare
        const decryptedPassword = CryptoJS.AES
        .decrypt(foundUser.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);

        if (decryptedPassword !== password) {
            return res.status(400).json({ message: "Wrong credentials!" });
        }
        // Generate JWT token
        const token = jwt.sign(
            { id: foundUser._id, isAdmin: foundUser.isAdmin },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
        );
        // Remove password from response
        const { password: _, ...userWithoutPassword } = foundUser._doc;

        // Return user data without password
        res.status(200).json({...userWithoutPassword, token});
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
        
    }
})

export default router 