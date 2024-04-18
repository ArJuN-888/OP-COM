const {Bill} = require("../Model/BillSchema")
const addBill = async(req,res) =>{
try{
 const {
    clientname,
    sellername,
    selleremail,
    clientemail,
    selleraddress,
    clientaddress,
    sellerphno,
    clientphno,
    sellercompany,
    productid,
    cpincode


} = req.body
 const data = new Bill({
    clientname,
    sellername,
    selleremail,
    clientemail,
    selleraddress,
    clientaddress,
    sellerphno,
    clientphno:`+91 ${clientphno}`,
    sellercompany,
    productid,
    cpincode
 })
 await data.save()
 res.status(200).json({message:"Payment Successfull"})
}
catch(error){
   res.status(400).json({message:"Unable to proceed",error})
}
}
const getBill = async(req,res) =>{
    try{
  
     const data = await  Bill.find({})
   
     res.status(200).json({bill:data})
    }
    catch(error){
console.log("error",error)
    }
    }
module.exports = {
    addBill,
    getBill
}