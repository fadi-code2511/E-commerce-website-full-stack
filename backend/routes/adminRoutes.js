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

//route: POST api/admin/add.
//desc: add new user.
//access: private(admin).
router.post("",async (req,res) => {
    const{name,email,password,role}=req.body;
    try {
        
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});

export default router