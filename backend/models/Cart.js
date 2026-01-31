import mongoose from "mongoose";

const cartItemShcema= new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true,  // we need required because its the praimary reference of the product 
    },
    image:String,  // no need for required field, because it comes from the Product 
    name:String,
    size:String,
    color:String,
    price:Number,
    quantity:{
        type:Number,
        default:1,
    }
},
{_id:false} // no id required for cartItem schema
)

const cartShcema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    guestId:String,
    products:[cartItemShcema],
    totalPrice:{
        type:Number,
        required:true,
        default:0,
    },
},
{timestamps:true}
)

const Cart=mongoose.model("Cart",cartShcema);
export default Cart