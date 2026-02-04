import express from "express";
import Checkout from "../models/Checkout.js";
import protect from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

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

//route: PUT api/checkout/:id/pay
//desc: update checkout to mark as paid after successful payment.
//access: private
router.put("/:id/pay",protect,async (req,res) => {
    const {paymentStatus,paymentDetails}=req.body;
    try {
        const checkout=await Checkout.findById(req.params.id);
        if (!checkout){
            return res.status(400).json({message:"No checkout session found"})
        }
        if(paymentStatus==="Paid"){
            checkout.isPaid=true;
            checkout.paymentStatus=paymentStatus;
            checkout.paymentDetails=paymentDetails;
            checkout.paidAt=Date.now()

            await checkout.save()
            res.status(200).json(checkout);
        }else{
            res.status(400).json({message:"Invalid payment status"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"})
    }
})

//route: POST api/checkout/:id/finalize.
//desc: finalize checkout and convert to an order after payment confirmation.
//access private.
router.post("/:id/finalize",protect,async (req,res) => {
 try {
    const checkout=await Checkout.findById(req.params.id);
    if(!checkout){return res.status(400).json({message:"no checkout found"})};
    if(checkout.isPaid && !checkout.isFinalized){
    const finalOrder= await Order.create({
        user:checkout.user,
        orderItems:checkout.checkoutItems,
        shippingAddress:checkout.shippingAddress,
        paymentMethode:checkout.paymentMethod,
        totalPrice:checkout.totalPrice,
        isPaid:true,
        isDelivered:false,
        paidAt:checkout.paidAt,
        paymentStatus:checkout.paymentStatus,
        paymentDetails:checkout.paymentDetails,
    })
    // mark the checkout as finalized
    checkout.isFinalized=true;
    checkout.finalizedAt=Date.now()
    await checkout.save()

    //delete the cart of the user.
    await Cart.findOneAndDelete({user:checkout.user})
    
    res.status(201).json(finalOrder)

}else if(checkout.isFinalized){
    res.status(400).json({message:"checkout is already finalized"})
}else{
    res.status(400).json({message:"checkout is not paid"})
}
    
 } catch (error) {
    console.error(error);
        res.status(500).json({message:"Server Error"})
 }
})

export default router