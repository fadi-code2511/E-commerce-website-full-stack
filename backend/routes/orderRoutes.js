import express from "express";
import protect from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";
import { get } from "mongoose";

const router = express.Router();

//route: GET api/orders/my-orders.
//desc: get all logged in user's orders
//access: private.
router.get("/my-orders", protect, async (req, res) => {
  try {
    //find the orders of the authanticated user
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    // console.log(orders)
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//route: GET api/orders/:id.
//Desc: get order details by id
//Access: private.
router.get("/:id", protect, async (req, res) => {
  try {
    const order=await Order.findById(req.params.id).populate("user","name email");
    if(!order){
        return res.status(400).json({message:"Order not found"})
    }
    res.status(200).json(order)

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
export default router;
