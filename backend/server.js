import express from "express"
import cors from "cors"
import dotenv from "dotenv" 
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import ProductRoutes from "./routes/ProductRouts.js"
import CartRoutes from "./routes/CartRoutes.js"

const app=express()

//middleware
app.use(express.json())  // we use epress.json() to parsing json payload and make the data accessable throug res.body (convert from json raw to=> js object)
app.use(cors()); //allows the frontend to access backend APIs when they are on different origins (exp: frontend:localhost:3000 ,backend:localhost:9000)

dotenv.config() // to load the envirement variables we call config()

//conncet to mongodb
connectDB()

const PORT=process.env.PORT || 3000 ;


app.get("/",(req,res)=>{
    res.send("Wlc there")
})
app.use("/api/users",userRoutes)
app.use("/api/products",ProductRoutes)
app.use("/api/cart",CartRoutes)
app.listen(PORT,()=>{
    console.log("server is running on prot:",PORT)
})