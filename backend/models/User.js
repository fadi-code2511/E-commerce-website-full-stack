import mongoose from "mongoose";
import bcrypt, { genSalt } from "bcryptjs";

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            trim:true,
            match:[/.+\@.+\..+/,"Please enter a valid email address"]
        },
        password:{
            type:String,
            required:true,
            minLength:6,
        },
        role:{
            type:String,
            enum:["customer","admin"],
            default:"customer",
        }
    },
    {
        timestamps:true,
    }
)

// password hash
userSchema.pre("save", async function (next) {      // before any save do this:
  if (!this.isModified("password")) return next();  // if this password for current user didn't modified return next()

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// match user entered password to hashed password
userSchema.methods.matchPassword=async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

const User=mongoose.model("User",userSchema);  //mongoose.model creates a model that represents a MongoDB collection and provides methods to interact(performing CRUD oprations) with it.
export default User