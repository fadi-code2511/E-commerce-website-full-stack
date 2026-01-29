import express from "express";
import Product from "../models/Product.js";
import protect, { admin } from "../middleware/authMiddleware.js";


const router = express.Router();

// Post api/products
// creat a new product
// access private/admin
router.post("/", protect,admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images, 
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;
    
    const product=new Product( {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user:req.user._id, //referances to the admin who creat the product.
    });

    const createdProduct= await product.save();
    res.status(201).json(createdProduct)
  } catch (error) {
    console.error(error);
    res.status(500).json({message:error.errorResponse.errmsg})
  }
});

export default router