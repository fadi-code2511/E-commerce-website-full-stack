import express from "express"
import cors from "cors"
import dotenv from "dotenv" 
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import ProductRoutes from "./routes/ProductRouts.js"
import CartRoutes from "./routes/CartRoutes.js"
import checkoutRoutes from "./routes/checkoutRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import subscriberRoutes from "./routes/subscriberRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import ProductAdminRoutes from "./routes/ProductAdminRoutes.js"
import orderAdminRoutes from "./routes/orderAdminRoutes.js"

const app=express()

//middleware
app.use(express.json())  // we use epress.json() to parsing json payload and make the data accessable throug res.body (convert from json raw to=> js object)
app.use(cors()); //allows the frontend to access backend APIs when they are on different origins (exp: frontend:localhost:3000 ,backend:localhost:9000)

dotenv.config() // to load the envirement variables we call config()

//conncet to mongodb
connectDB()

const PORT=process.env.PORT || 3000 ;


app.get("/",(req,res)=>{
    res.send("Wlc to Trendy website")
})
app.use("/api/users",userRoutes)
app.use("/api/products",ProductRoutes)
app.use("/api/cart",CartRoutes)
app.use("/api/checkout",checkoutRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/subscribe",subscriberRoutes)

//admin
app.use("/api/admin/users",adminRoutes)
app.use("/api/admin/products",ProductAdminRoutes)
app.use("/api/admin/orders",orderAdminRoutes)


app.listen(PORT,()=>{
    console.log("server is running on prot:",PORT)
})