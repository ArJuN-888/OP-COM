const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    filename:{type:String,required:true},
    cart : [{
        productID : {type:mongoose.Schema.Types.ObjectId,ref : "Product", required: true },
        quantity : {type:Number,required:true}
       
    }],
    liked : [{ type:mongoose.Schema.Types.ObjectId,ref : "Product", required: true }],
    sellerstatus:{type:Boolean,required:true},
    banned:{type: Boolean,required: true  },
    enotify:{type: Boolean,required: true  },
    req:{type: Boolean,required: true,default:false  }
})
const sellerSchema = new mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId,ref:"User",required : true},
    username:{type:String,required:true},
    email:{type:String,required:true},
    category:{type:String,required:true},
    address: { type: String, required: true },
    description: { type: String,required: true  },
    filename:{type:String,required:true},
    phno:{type:String,required:true},
   pending:{type: Boolean,required: true  },
   notify:{type: Boolean,required: true  },
  

})
const Seller = mongoose.model("Seller",sellerSchema)
const Users = mongoose.model("User",userSchema)
module.exports = {
    Users,
    Seller
}