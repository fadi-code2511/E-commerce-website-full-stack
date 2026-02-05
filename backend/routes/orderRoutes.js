import express from "express";
import protect from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";


const router=express.Router();

//route: GET api/orders/my-orders.
//desc: get all logged in user's orders
//access: private.
router.get("/my-orders",protect,async (req,res) => {
    try {
        //find the orders of the authanticated user
        const orders=await Order.find({user:req.user._id}).sort({createdAt:-1});
        // console.log(orders)
        res.json(orders)
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
})

export default router;