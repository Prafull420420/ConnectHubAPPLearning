const mongoose= require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");  // ✓ ADD THIS LINE
// const userSchema= new mongoose.Schema({
//     name:{type:String,minlength:3,maxlength:100,trim:true},
//     email:{type:String,required:true, unique:true},
//     password:{type:String, required:true},
//     age:{type:Number, required:false}
// },{timestamps:true});
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    age: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);
userSchema.pre('save', async function (next) {
if (this.isModified('password')) {
  this.password= await bcrypt.hash(this.password, 10);    
  }
  next();
});
userSchema.methods.validatePassword=async function(password){
  const passwordHash=this.password;
  return await bcrypt.compare(password, this.password);
}
// userSchema.methods.getjwt=async function(){
//   const user=this;
//   const token= jwt.sign({id:user._id.toString()}, process.env.JWT_SECRET, {expiresIn:'7d'});
//   return token;
// }
userSchema.methods.getjwt = async function () {
  const user = this;
  const token = await jwt.sign(
    { _id: user._id },           // ✓ Changed from "id" to "_id"
    "999@Akshad",                // ✓ Changed from process.env.JWT_SECRET
    { expiresIn: "7d" }
  );
  return token;
};

const User= mongoose.model('User', userSchema);
module.exports= User;