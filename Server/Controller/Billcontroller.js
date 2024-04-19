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
    cpincode,
    stat


} = req.body
if(stat === "single")
{
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
        cpincode,
        stat
     })
     await data.save()
    return res.status(200).json({message:"Payment Successfull"})
}
else(stat === "multiple")
{
    const data = new Bill({
        clientname,
        clientemail,
        clientaddress,
        clientphno:`+91 ${clientphno}`,
        cpincode,
        stat
     })
     await data.save()
    return res.status(200).json({message:"Payment Successfull"})  
}

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