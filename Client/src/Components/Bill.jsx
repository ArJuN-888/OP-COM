import React, { useState,useEffect } from 'react'
import axios from "axios"
import { useCookies } from "react-cookie";
import { Button } from '@mui/material';
import GetID from './Hooks/GetId';
import { MdOutlineSell } from "react-icons/md";
export default function Bill() {
    const[allcartpro,setAllcartpro] = useState([])
    const [carted,setcarted] = useState([])
  

  
    console.log("carted",carted)
    const[allbill,setAllBill] = useState([])
    const [tog, setTog] = useState(Array(allbill.length).fill(false));
    const [Cookies] = useCookies(["token"]);
    console.log("tog",tog)
    console.log("allbill",allbill)
    console.log("cartpro",allcartpro)
    const userID = GetID()
    useEffect(()=>{
        fetchpaypro();
        getBill()
},[])
    const fetchpaypro = async() =>{
        const response = await axios.get(`http://localhost:5000/User/Cart/items/${userID}`,{
          headers:{
            Authorization:`${Cookies.token}`
          }
        }) 
        setAllcartpro(response.data.cart)
    }
    const getBill = async() =>{
        const response = await axios.get(`http://localhost:5000/Bill/Billregistration/retrieve/${userID}`,{
            headers:{
              Authorization:`${Cookies.token}`
            }
          }) 
          setAllBill(response.data.bill)
    }
    const getpro = async(id,status,index) =>{
   try{
if(status === "single" && allcartpro.find(item => item.productID._id === id))
    {
          const filtercarted = allcartpro.filter(element => element.productID._id === id)
          setcarted(filtercarted)
    }
    else if(status === "single")
    {
        const response = await axios.get(`http://localhost:5000/Product/getProduct/idforstat/${userID}`,{
            headers:{
              Authorization:`${Cookies.token}`
            }
          }) 
          const filterproduct = response.data.products.filter(element=>element._id === id)
          setcarted(filterproduct)
    }
    else if(status === "multiple"){
        setcarted(allcartpro)
    }
    setTog(new Array(tog.length).fill(false));
    setTog(prevTog => {
        const newTog = [...prevTog];
        newTog[index] = !newTog[index];
        return newTog;
    });
   }
   catch(error)
   {
console.log(error)
   }

 
    }
    const billClose = () =>{
        setTog(new Array(tog.length).fill(false)); 
    }
    const Total = () =>{
      let total =0;
      carted.forEach((element)=>{
     total += (element.productID&&element.productID.price || element.price) * (element.quantity&&element.quantity || 1)
      })
      return total
    }
  return (
    <div className='fs-5' style={{paddingTop:"80px"}} >
       {allbill.length !==0 ?   <Button style={{letterSpacing:"3px"}} className='ms-2 text-black' variant='outlined'>Transaction History</Button> : <h4></h4> }
    {allbill.map((data, index) => (
        <div key={index} className='m-2 p-3' style={{boxShadow:"0px 0px 1px 0px"}}>
          <h3>Op-cOm</h3>
           <Button variant='outlined' style={{letterSpacing:"2px"}}> Purchase Date : {data.dt}</Button>
           <div> <Button variant='outlined' color='error'  className='mt-3'>Client Purchase data</Button></div>
            <hr></hr>
           <div>Consumer : {data.clientname}</div> 
            <div>Email : {data.clientemail}</div>
            {/* <div>Address : {data.clientaddress}</div>
            <div>Phno : {data.clientphno}</div> */}
           <div> Pincode : {data.cpincode}</div>
            {/* <h5>Seller data</h5>
            {data.sellername}
            {data.selleremail}
            {data.selleraddress}
            {data.sellerphno}
            {data.sellercompany}<br></br> */}
            <Button onClick={() => getpro(data.productid, data.stat, index)} className='' variant='contained' color='success'>Show more details</Button>
            {tog[index] && (
                <div>
                  {carted.map((item, idx) => (
    <div key={idx}>
        
        {item.brandname && <div>brand: {item.brandname}</div>}
        {item.description && <div>description: {item.description}</div>}
        {item.capacity && <div>capacity: {item.capacity}</div>}
        {item.material && <div>material: {item.material}</div>}
        {item.body && <div>body: {item.body}</div>}
        {item.color && <div>color: {item.color}</div>}
        {item.price && <div>price: {item.price}</div>}
        {item.productID && <div>brand: {item.productID.brandname}</div>}
        {item.productID && <div>description: {item.productID.description}</div>}
        {item.productID && <div>capacity: {item.productID.capacity}</div>}
        {item.productID && <div>material: {item.productID.material}</div>}
        {item.productID && <div>price: {item.productID.price}</div>}
        <div>quantity: {item.quantity || 1}</div>
        {item.brandname && <div>total ₹: {`${item.price}` * 1}</div>}
        {item.productID && <div>total ₹: {item.productID.price * (item.quantity || 1)}</div>}
     
    
    </div>
))}
 <div className='d-flex gap-2'>Status: <Button variant='outlined' color="success">PAYMENT SUCCESSFUL</Button>
        <Button onClick={()=>billClose()} variant='outlined' color='error'>Close</Button>
        </div>
       <div className='d-flex align-items-center gap-4'><h4>Grand Total - </h4> <label className='fs-2'><MdOutlineSell/> ₹ {Total()}</label></div> 
                </div>
            )}
                <div><label className='mt-2'> <label>For any Query E-mail opcomsupprt.12@gmail.com</label></label></div>
        </div>
        
    ))}
    
</div>
  )
}
