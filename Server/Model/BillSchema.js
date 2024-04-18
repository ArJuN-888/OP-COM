const mongoose = require("mongoose")
const BillSchema = new mongoose.Schema({
    clientname:{type:String,required:true},
    sellername:{type:String,required:true},
    selleremail:{type:String,required:true},
    clientemail:{type:String,required:true},
    selleraddress:{type:String,required:true},
    clientaddress:{type:String,required:true},
    sellerphno:{type:String,required:true},
    clientphno:{type:String,required:true},
    sellercompany:{type:String,required:true},
    clientcompany:{type:String,required:true},
    productname:{type:Array},
    
})
const Bill = mongoose.model("Bill",BillSchema)
module.exports = {
    Bill
}