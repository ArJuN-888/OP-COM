const {Bill} = require("../Model/BillSchema")
const phoneregex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
const addBill = async(req,res) =>{
try{
 const {
    userid,
    clientname,
    clientemail,
    clientaddress,
    clientphno,
    productid,
    cpincode,
    stat,
    dt


} = req.body
 console.log("types",typeof clientaddress , typeof clientphno ,typeof cpincode)
if( !clientphno || !cpincode || !clientaddress)
{
    return res.status(400).json({message:"Shipping information is mandatory"})
}
if(cpincode.length<6)
{
    return res.status(400).json({message:"Enter a valid 6 digit cvv"})
}
if(!clientphno.match(phoneregex))
{
    return res.status(400).json({message:"Enter a valid 10digit mobile number"})
}
if(stat === "single")
{
    const data = new Bill({
        userid,
        clientname,
        clientemail,
        clientaddress,
        productid,
        clientphno:`+91 ${clientphno}`,
        cpincode,
        stat,
        dt
     })
     await data.save()
    return res.status(200).json({message:"Payment Successfull"})
}
else(stat === "multiple")
{
    const data = new Bill({
        userid,
        clientname,
        clientemail,
        clientaddress,
        clientphno:`+91 ${clientphno}`,
        cpincode,
        stat,
        dt
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
       
        const data = await Bill.find({userid:req.params.userID});
        console.log("dsdddfd",data)
   
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