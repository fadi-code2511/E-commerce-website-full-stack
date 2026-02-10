import express from "express";
import { admin } from "../middleware/authMiddleware.js";
import protect from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";
const router = express.Router();

//Route: GET api/admin/orders
//DESC: get all orders
//access: private(admin)
router.get("/",protect,admin,async (req,res) => {
    try {
        
        const orders=await Order.find().populate("user","name email");
        if(orders){
            res.json(orders);
        }else{
            res.status(400).json({Message:"no orders found"})
        }
    } catch (error) {
            console.error(error);
    res.status(500).json({ message: "Server Error" });
    }
})


export default router;
