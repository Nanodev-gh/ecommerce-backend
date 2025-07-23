import { Router } from "express";

import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/verifyToken.js";
import { cancelOrder, createOrder, deleteOrder, getOrder, getOrders, getUserOrder } from "../controllers/order.js";


// CREATE ORDER ROUTE

const router = Router();

// CREATE ORDER
router.post("/", verifyTokenAndAuthorization, createOrder)

// GET ALL ORDERS
router.get("/", verifyTokenAndAdmin, getOrders)

// GET USER ORDERS
router.get("/user", verifyTokenAndAuthorization, getUserOrder)

// GET ORDER BY ID
router.get("/:id", verifyTokenAndAdmin, getOrder)

// DELETE ORDER
router.delete("/:id", verifyTokenAndAdmin, deleteOrder) 

// CANCEL ORDER
router.put("/:id", verifyTokenAndAuthorization, cancelOrder)

// Export the router
export const orderRouter = router;

