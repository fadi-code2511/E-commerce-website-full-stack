import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const router=express.Router();

// POST api/cart
// add a product to cart for guest and logged in user
// access public
const getcart=async(userId,guestId)=>{
    if (userId){
        return await Cart.findOne({userId});
    }
    if (guestId){
        return await Cart.findOne({guestId});
    }
    return null;
}

router.post("/",async (req,res) => {
    try {
        
    
    const {productId,size,color,userId,guestId,quantity}=req.body;
    const product= await Product.findById(productId)
    if (!product) res.status(404).json({message:"product not found"})
    
    // determine if the user is logged in or guest
    const cart=await getcart(userId,guestId);
    // if cart is exist , update the cart
    if(cart){
        const productIndex=cart.products.findIndex((product)=>
            product.productId.toLocaleString()=== productId && product.size===size && product.color===color
        )
        if(productIndex>-1){
            //if the product is exist, update the quantity
            cart.products[productIndex].quantity+=parseInt(quantity);
        }else{
            //product not exist, add new product to the cart
            cart.products.push({
                productId,
                size,
                color,
                quantity,
                image:product.images[0].url,
                price:product.price,
                name:product.name,
            })
        }
        cart.totalPrice=cart.products.reduce((accumulator,item)=>accumulator+item.price*item.quantity,0)
        await cart.save();
        res.json(cart);
    }else{
         const newCart=await  Cart.create({
            user:userId?userId:undefined,
            guestId:guestId?guestId:"guest_" + new Date().getTime(),
            products:[
                {
                    productId,
                    size,
                    color,
                    quantity,
                    name:product.name,
                    price:product.price,
                    image:product.images[0].url,
                }
            ],
            totalPrice:product.price*quantity,
         })
        res.status(201).json(newCart)
    }} catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"})
    }

})

export default router