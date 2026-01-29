
import jwt from "jsonwebtoken"
import User from "../models/User.js"

//middleware to protect routs
const protect=async(req,res,next)=>{
    let token;

    if(
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")  //If the request has an Authorization header and its value starts with the word "Bearer".
    ){
        try{
            token=req.headers.authorization.split(" ")[1]; // we use split because we are passing a "Bearer" "space " "fdsklms324komokfmd23(token)" in the headers. however we need to get only the token part.
            const decoded=jwt.verify(token,process.env.JWT_SECRET);  //decode jwt

            req.user=await User.findById(decoded.user.id).select("-password"); //we assign req.user not  local variable (const)user because it allows all routes use the info of current user(we use it in userRoutes.js at GET /profile), where req.user=the current user becouse we send the id and role in jwt as payload, select(-pass) to exlude password.
            next();
        }catch(err){
            console.error("token verification failed:",err);
            res.status(401).json({message:"not authorized,token failed"})
        }
    }else{
        res.status(401).json({message:"not authoraized,no token provided"})
    }
}

export default protect;