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
router.put("/:id", protect, admin, async (req, res) => {
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
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured != undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished != undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      await product.save();
      res.json(product);
    } else {
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

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Product Deleted" });
    } else {
      res.json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
});

// GET api/products
// get product by filter
// access public
router.get("/", async (req, res) => {
  try {
    const {
      collection,
      category,
      size,
      color,
      brand,
      maxPrice,
      minPrice,
      material,
      gender,
      search,
      sortBy,
      limit,
    } = req.query;

    let query={};
    // filter
    if(collection && collection.toLocalLowerCase()!=="all"){
      query.collections=collection;
    }
    if (category && category.toLocalLowerCase()!=="all"){
      query.category=category;
    }
    if (gender){
      query.gender=gender;
    }
    if(material){
      query.material={$in: material.split(",")};
    }
    if (size){
      query.sizes={$in: size.split(",")}
    }
    if (brand){
      query.brand={$in: brand.split(",")}
    }
    if (color){
      query.colors={$in: [color]}
    }
    if (minPrice || maxPrice){
      query.price={};
      if(minPrice) query.price.$gte=Number(minPrice)
      if(maxPrice) query.price.$lte=Number(maxPrice) // convert to number
    }
    if(search){
      query.$or=[
        {name:{$regex: search,$options:"i"}},  // i : insensitve
        {description:{$regex: search,$options:"i"}},
      ]
    }
    let sort={};
    if(sortBy){
      switch(sortBy){
        case "priceAsc":
          sort={price:1};
          break;
        case "priceDsc":
          sort={price:-1};
          break;
        case "popularity":
          sort={rating:-1};
          break;
        default:
          break;
        
      }
    }

    let products=await Product.find(query).sort(sort).limit(Number(limit)|| 0)
    res.json(products);
      
    // const show = await Product.find();
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error")
  }
});


//GET api/products/best-seller
// Retrive product by highest rating
// access public
router.get("/best-seller",async (req,res) => {
  try {
    const bestProduct=await Product.find().sort({rating:-1}).limit(1);
    if (bestProduct){
      res.json(bestProduct)
    }else{
      res.status(404).json({message:"Best seller Product not found"})
    }
  } catch (error) {
   console.error(error);
    res.status(500).send("Server Error") 
  }
})

//GET api/products/:id
//get product by ID
// access public
router.get("/:id",async (req,res) => {
  try {
    const product=await Product.findById(req.params.id);
    if(product){
      res.json(product);
    }else{
      res.status(404).send("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"server Error"})
  }
})

//GET api/products/similar/:id
// get similar products based on the current product's gender category
/// access public
router.get("/similar/:id",async (req,res) => {
  try {
    
    const id=req.params.id
    const currentProduct=await Product.findById(id);
    if(currentProduct){
      const similarProducts=await Product.find({
        _id:{$ne:id},
        category:currentProduct.category,
        gender:currentProduct.gender,
      }).limit(4)
      res.json(similarProducts)
    }else{
      res.status(404).json({message:"Product not found"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error")
  }
})




export default router;
