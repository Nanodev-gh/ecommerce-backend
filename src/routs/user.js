import { Router } from "express";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/verifyToken.js";
import { handleGetUser, handleGetUsers, handleUserDelete, handleUserUpdate } from "../controllers/user.js";



const router = Router();
// Update user
router.put("/:id", verifyTokenAndAuthorization, handleUserUpdate)

// Delete user
router.delete("/:id", verifyTokenAndAuthorization, handleUserDelete)

// Get user
router.get("/:id", verifyTokenAndAdmin, handleGetUser)

// get users 
router.get('/', verifyTokenAndAdmin, handleGetUsers)


export default router;
