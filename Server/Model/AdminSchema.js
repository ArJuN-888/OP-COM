const mongoose = require("mongoose")
const adminSchema = new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    address:{type:String},
    phno:{type:String,required:true},
    company:{type:String}
})
const Admin = mongoose.model("Admin",adminSchema)
module.exports = {
    Admin
}