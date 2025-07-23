import { Router } from "express";
import { verifyTokenAndAuthorization, verifyTokenAndAdmin } from "../middlewares/verifyToken.js";
import { createCart, getAllCarts, updateCart, deleteCart, getCartById, addItemToCart, removeItemFromCart, getCart, clearCart, checkOut } from "../controllers/cart.js";
import { validateCart } from "../middlewares/validator.js";

const router = Router();

// CREATE CART
router.post("/", verifyTokenAndAuthorization, validateCart, createCart);

// GET USER CART
router.get("/user", verifyTokenAndAuthorization, getCart);

// GET CART BY IDS
router.get("/:id", verifyTokenAndAdmin, getCartById); 


// GET ALL CARTS
router.get("/", verifyTokenAndAdmin, getAllCarts);

// UPDATE CART
router.put("/", verifyTokenAndAuthorization, updateCart);

// DELETE CART
router.delete("/:id", verifyTokenAndAdmin, deleteCart);

// ADD ITEM TO CART
router.post("/items", verifyTokenAndAuthorization, addItemToCart);

// REMOVE ITEM FROM CART
router.delete("/item", verifyTokenAndAuthorization, removeItemFromCart);

// CLEAR CART
router.delete("/clear", verifyTokenAndAuthorization, clearCart) 

// CHECKOUT CART
router.post("/checkout", verifyTokenAndAuthorization, checkOut); 


// Export the router
export const cartRouter = router;