import express from "express";
import User from "../models/User.js";
import { admin } from "../middleware/authMiddleware.js";
import protect from "../middleware/authMiddleware.js";
const router=express.Router();

//route: GET api/admin/users.
//desc: retrieve all users.
//access: private(admin).
router.get("/",protect,admin,async (req,res) => {
    try {
        const users= await User.find({},{"password":0});
        if(!users){
            return res.status(500).json({message:"No users found"});
        }
        res.status(200).json(users);
        
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});

//route: POST api/admin/users.
//desc: add new user.
//access: private(admin).
router.post("/",protect,admin,async (req,res) => {
    const{name,email,password,role}=req.body;
    try {
        const user=await User.findOne({email})
         if(user){
            return res.status(400).json({message:"this email user is already exist"});
        }
        const newUser=await User.create({
            name,
            password,
            email,
            role
        });
        // console.log(newUser);
        res.status(200).json(newUser)
        
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});

export default router