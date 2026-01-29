import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "user already exists" });

    user = new User({ name, email, password });
    await user.save();

    // creat jwt payload
    const payload = { user: { id: user._id, role: user.role } };
    //return token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err)
          return res.status(500).json({ message: "token generation faild" });
        res.status(201).json({
          user: {
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      },
    );
  } catch (error) {
    console.log(error, "#");
    res.status(500).send("server error");
  }
});


export default router;
