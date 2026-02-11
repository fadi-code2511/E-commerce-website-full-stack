import express from "express";
import Subscriber from "../models/Subscriber.js";

const router = express.Router();

//route: POST api/subscribe
//desc: save the email of new subscriber
//access: public
router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) {
   return res.status(400).json({ message: "Email is required" });
  }
  try {
    //check if the email already registered
    let subscriberEmail = await Subscriber.findOne({ email });
    if (subscriberEmail) {
      return res.status(400).json({ message: "this email already registered" });
    }
    //create new subscriber
    // const newSubscriber = await Subscriber.create({
    //   email,
    // });
    subscriberEmail=new Subscriber({email});
    await subscriberEmail.save();
    res.status(201).json({message:"Successfully registered to the newsletter"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
