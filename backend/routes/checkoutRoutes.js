import express from "express";
import Checkout from "../models/Checkout.js";
// import Product from "../models/Product.js";
// import Cart from "../models/Cart.js";
// import Order from "../models/Order.js";
import protect from "../middleware/authMiddleware.js";

const router=express.Router();

//route: POST api/checkout
//desc: create a new checkout session
//access private
router.post("/",protect,async(req,res)=>{
    const {checkoutItems,shippingAddress,totalPrice,paymentMethod}=req.body;

    //check if the check items are empty.
    if(!checkoutItems || checkoutItems.length===0){
        return res.status(400).json({message:"no items to checkout"})
    }
    try {
        const newCheckout=await Checkout.create({
            user:req.user._id,
            shippingAddress:shippingAddress,
            totalPrice, //or we can use totalPrice:totalPrice; , its the same.
            paymentMethod,
            checkoutItems,
            paymentStatus:"pendding",
            isPaid:false,
        });
        console.log("checkout session created with user id ",req.user._id);
        // newCheckout.save();
        res.status(201).json({newCheckout});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"})
    }
});



export default router