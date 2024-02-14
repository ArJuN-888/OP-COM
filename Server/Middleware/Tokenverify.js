const JWT = require("jsonwebtoken")
require("dotenv").config()
const verifyToken = (req,res,next) =>{
    const token = req.headers.authorization;
    if(!token)
    {
      console.log("token is undefined")
    }
    if(token)
    {
    console.log("user-token",token)
      JWT.verify(token,process.env.SECRET,(err)=>{
        if(err) return res.sendStatus(403)
        next()
      })
  
    }
    else{
      res.status(400).json({message:"login required"})
     
    }
  }
  module.exports = verifyToken