const mongoose = require("mongoose")
const BillSchema = new mongoose.Schema({
    userid:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    clientname:{type:String,required:true},
    sellername:{type:String},
    selleremail:{type:String},
    clientemail:{type:String,required:true},
    selleraddress:{type:String},
    clientaddress:{type:String,required:true},
    sellerphno:{type:String},
    clientphno:{type:String,required:true},
    sellercompany:{type:String},
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