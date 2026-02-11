import mongoose from "mongoose"

const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongodb connected successfully");
        
    }catch(err){
        console.error("Mongodb connection faild",err);
        process.exit(1); //it immediately stop the node.js process when error happens
    }
}

export default connectDB