import express from "express";
import { admin } from "../middleware/authMiddleware.js";
import protect from "../middleware/authMiddleware.js";
import Product from "../models/Product.js";

const router = express.Router();

//Route: GET api/admin/products
//DESC: get all products
//access: private(admin)
router.get("/",protect,admin,async (req,res) => {
    try {
        
        const products=await Product.find();
        if(products){
            res.json(products);
        }else{
            res.status(400).json({Message:"no products found"})
        }
    } catch (error) {
            console.error(error);
    res.status(500).json({ message: "Server Error" });
    }
})

export default router;
