const mongoose = require("mongoose")
const BillSchema = new mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    clientname:{type:String,required:true},
    clientemail:{type:String,required:true},
    clientaddress:{type:String,required:true},
    clientphno:{type:String,required:true},
    productid:{type:mongoose.Schema.Types.ObjectId,ref:"Product"},
    cpincode:{type:Number,required:true},
    dt:{type:String,required:"true"},
    stat:{type:String,required:true}
   
    
},
{
    
        timestamps:true
    
})
const Bill = mongoose.model("Bill",BillSchema)
module.exports = {
    Bill
}