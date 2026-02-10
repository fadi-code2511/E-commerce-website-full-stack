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

//Route: PUT api/admin/orders/:id
//DESC: update a status of an order
//access: private(admin)
router.put("/:id",protect,admin,async (req,res) => {
    const {status}=req.body;
    try {
        const order=await Order.findById({_id:req.params.id});
        if(order){
            
                order.status=status||order.status;
                order.isDelivered=status=="Delivered" ? true:order.isDelivered;
                order.deliverdAt=status=="Delivered" ? Date.now() : order.deliverdAt;
            
           const updatedOrder= await order.save()
            res.json(updatedOrder);
        }else{
            res.status(404).json({Message:"no order found"})
        }
    } catch (error) {
            console.error(error);
    res.status(500).json({ message: "Server Error" });
    }
})

//Route: DELETE api/admin/orders/:id
//DESC: delete an order
//access: private(admin)
router.delete("/:id",protect,admin,async (req,res) => {
    try {
        const order=await Order.findById({_id:req.params.id});
        if(order){
          await order.deleteOne()
            res.json({message:"order deleted"});
        }else{
            res.status(404).json({Message:"no order found"})
        }
    } catch (error) {
            console.error(error);
    res.status(500).json({ message: "Server Error" });
    }
})
export default router;
