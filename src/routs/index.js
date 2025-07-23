import { Router } from "express";
import authRout from './auth.js'
import userRout from './user.js'
import { productRouter } from "./product.js";
import { cartRouter } from "./cart.js";
import { orderRouter } from "./order.js";


const router = Router();


router.use('/api/auth', authRout);
router.use('/api/users', userRout)
router.use('/api/products', productRouter);
router.use('/api/carts', cartRouter);
router.use('/api/orders', orderRouter);


export default router;