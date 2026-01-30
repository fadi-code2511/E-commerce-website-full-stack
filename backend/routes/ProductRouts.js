import express from "express";
import Product from "../models/Product.js";
import protect, { admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Post api/products
// creat a new product
// access private/admin
router.post("/", protect, admin, async (req, res) => {
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

    const product = new Product({
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
      user: req.user._id, //referances to the admin who creat the product.
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.errorResponse.errmsg });
  }
});

// PUT api/products/:id
// update a product
// access admin/private
router.put("/:id",protect,admin, async (req, res) => {
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
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description =description || product.description;
      product.price =price || product.price;
      product.discountPrice =discountPrice || product.discountPrice;
      product.countInStock =countInStock || product.countInStock;
      product.category =category || product.category;
      product.brand =brand || product.brand;
      product.sizes =sizes || product.sizes;
      product.colors =colors || product.colors;
      product.collections =collections || product.collections;
      product.material =material || product.material;
      product.gender =gender || product.gender;
      product.images =images || product.images;
      product.isFeatured =isFeatured!=undefined?isFeatured :product.isFeatured;
      product.isPublished =isPublished!=undefined?isPublished :product.isPublished;
      product.tags =tags || product.tags;
      product.dimensions =dimensions || product.dimensions;
      product.weight =weight || product.weight;
      product.ske =sku || product.sku;

      await product.save()
      res.json(product)
    }else{
            res.status(404).json({ message: "product not found" });

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE api/prpducts/:id
// delete a product
// access admin/private

router.delete("/:id",protect,admin,async(req,res)=>{
  try {
    const product=await Product.findById(req.params.id)
    if (product) {
      await product.deleteOne()
      res.json({message:"Product Deleted"})
    }else{
      res.json({message:"Product not found"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"server error"})
  }
})
export default router;
