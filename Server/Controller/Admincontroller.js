const {Admin} = require("../Model/AdminSchema")
const JWT = require("jsonwebtoken")
require("dotenv").config()
const adminLogin = async (req,res) =>{
    try{
        const {email,password} = req.body
        const admin = await Admin.findOne({email})
        if(!password && !email)
        {
            return res.status(400).json({message:"Empty fields unable to proceed"}) 
        }
        if(!admin)
        {
          return res.status(400).json({message:"un-authorized access"})
        }
        if(!email)
        {
            return res.status(400).json({message:"email required"})  
        }
        if(!password)
        {
            return res.status(400).json({message:"password required"})
        }
        if(password !== admin.password)
        {
           return res.status(400).json({message:"password denied"})
        }
        console.log("env",process.env.SECRET)
        const token = JWT.sign({id : admin._id},process.env.SECRET)
       return res.status(200).json({message:"Successfully logged-in",adminID:  admin._id ,token: token})
        
    }
    catch(error)
    {
       return res.status(500).json({message:"unable to login"})
    }
    
}




module.exports ={
    adminLogin,
    
}