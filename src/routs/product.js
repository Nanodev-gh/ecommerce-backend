import { Router } from "express";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.js"
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct } from "../controllers/product.js";
import {validateProduct} from "../middlewares/validator.js";


const router = Router()

// CREATE PRODUCT
router.post("/", verifyTokenAndAdmin, validateProduct, createProduct)

// GET ALL PRODUCTS
router.get("/", getProducts)


// GET PRODUCT BY ID
router.get("/:id", getProduct)

// UPDATE PRODUCT
router.put("/:id", verifyTokenAndAdmin, validateProduct, updateProduct)

// DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, deleteProduct)

// Export the router
export const productRouter = router