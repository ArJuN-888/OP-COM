const mongoose = require("mongoose")
const reportSchema = new mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId,required : true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    filename:{type:String,required:true},
    sellerstatus:{type:Boolean,default:false,required:true},
    reportstatement:{type:String,required:true},
    dt:{type:String,required:true},

})
const report = mongoose.model("Report",reportSchema)
module.exports = {report}