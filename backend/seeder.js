import mongoose from "mongoose";
import User from "./models/User.js";
import Product from "./models/Product.js";
import dotenv from "dotenv";
import products from "./data/products.js";
import Cart from "./models/Cart.js";

dotenv.config();

// connet to db
mongoose.connect(process.env.MONGO_URI)

// function to seed data

const seedData=async ()=>{
    try {
        //clear existing data
        await User.deleteMany();
        await Product.deleteMany();
        await Cart.deleteMany()

        //create a default admin
        const createdUser=await User.create({
            name:"Admin User",
            email:"admin@example.com",
            password:123123,
            role:"admin",
        })
        //assig the user id to each product
        const userID=createdUser._id;
        const sampleProducts=products.map(product=>{
          return  {...product,user:userID}
        })

        await Product.insertMany(sampleProducts);
        console.log("Product data seeded successfully");
        process.exit();
    } catch (error) {
        console.error("Error seeding the data",error);
        process.exit(1);
    }
}

seedData()