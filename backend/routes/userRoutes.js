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

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentails" });

    const isMatched = await user.matchPassword(password);
    if (!isMatched)
      return res.status(400).json({ message: "Invalid Credentails" });

    //creat jwt payload
    const payload = { user: { id: user._id, role: user.role } };
    // return token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) return res.status(500).json("Token generation faild");

        res.json({
          user: {
            name: user.name,
            email: user.email,
            role:user.role,
          },
          token
        });
      },
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server erorr");
  }
});
export default router;
