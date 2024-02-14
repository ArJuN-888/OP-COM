const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema({
    stoke:{type:Number,required:true},
    category:{type:String,required:true},
    brandname:{type:String,required:true},
    productname:{type:String,required:true},
    description:{type:String,required:true},
    photourl:{type:String,required:true},
    loginid:{type:mongoose.Schema.Types.ObjectId,ref:"User",required : true},
    price:{type:Number,required:true},
   
})
const Products = mongoose.model("Product",ProductSchema)
module.exports = {
    Products
}