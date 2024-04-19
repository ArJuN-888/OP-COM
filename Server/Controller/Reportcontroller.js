const {report} =require("../Model/ReportSchema")
const { Users} = require("../Model/UserSchema");
const addreport = async (req,res)=>{
    try{
        const {userID,reportstatement,dt,rating} = req.body
        const user = await Users.findById(userID)
      
        if(!reportstatement)
        {
           return res.status(400).json({message:"Empty field"})
        }
        if(rating === 0)
        {
            return res.status(400).json({message:"State Your rating"})
        }
        const data = new report({userID,name:user.username,filename:user.filename,sellerstatus:user.sellerstatus,reportstatement,dt,email:user.email,rating})
        await data.save()
        res.status(200).json({message:"reported Successfully"})
    }
    catch(error){
        res.status(400).json({message:"unable to proceed",error})
    }
  
}
const getreport = async (req,res)=>{
    try{
        const data = await report.find({})
        res.status(200).json({message:"reported Successfully",reports:data})
    }
    catch(error){
        res.status(400).json({message:"unable to proceed",error})
    }
  
}
const deleterepo = async (req,res)=>{
    try{
        const {repoID} = req.params
        const data = await report.findByIdAndDelete(repoID)
        res.status(200).json({message:"Reports/Comments are Successfully read and  deleted"})
    }
    catch(error){
        res.status(400).json({message:"unable to delete"})
    }
  
}
module.exports={
    addreport,
    getreport,
    deleterepo
}