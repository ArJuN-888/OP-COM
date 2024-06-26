import React from 'react'
import axios from 'axios';
import { PiShoppingCart } from "react-icons/pi";
import "../Styles/Cart.css"
import {Button} from "@mui/material"
import { useEffect,useState } from 'react'
import { TfiTrash } from "react-icons/tfi";
import nol from "./background/nol.png"
import {  toast,Flip} from 'react-toastify';
import { useCookies } from "react-cookie";
import GetID from './Hooks/GetId';
import { Link,useNavigate } from 'react-router-dom';

export default function Cart() {
  const nav = useNavigate()
  const [state,setstate] = useState("")
  const[Cart,setCart]= useState([])
  const [bannedid,setbannedID] = useState([])
  console.log("bannedid",bannedid)
  console.log("cart",Cart)
  useEffect(()=>{
 fetchcart()
 getbannedid()
},[state])
const [Cookies] = useCookies(["token"]);
const userID = GetID()

const getbannedid = async() =>{
  try{
const response = await axios.get("http://localhost:5000/User/UserRegistration/banned",{
headers:{
  Authorization:`${Cookies.token}`
}
})
setbannedID(response.data.bannedids)

}
catch(error)
{
toast(error.response.data.message,{
transition: Flip
})
}
}
const fetchcart = async() =>{
  const response = await axios.get(`http://localhost:5000/User/Cart/items/${userID}`,{
    headers:{
      Authorization:`${Cookies.token}`
    }
  }) 
  setCart(response.data.cart)
}
const remove = async(id) =>{
  try{
    const response = await axios.put(`http://localhost:5000/User/Cart/remove/${userID}`,{id},{
      headers:{
        Authorization:`${Cookies.token}`
      }
    })
    toast.success(response.data.message,{
      transition: Flip
    })
    fetchcart()
  }
  catch(error)
  {
    toast(error.response.data.message,{
      transition: Flip
    })
  }
}
const updateQuantity = async (id, quantity) => {
  try {
    const response = await axios.put(`http://localhost:5000/User/Cart/updatequantity/${userID}`, { id, quantity }, {
      headers: {
        Authorization: `${Cookies.token}`
      }
    });
    setstate(response.data.quantity)
    
  } catch (error) {
    toast.warning(error.response.data.message,{
      transition: Flip
    })
  }
};
const total = () =>{
  let total =0;
  Cart.forEach((element)=>{
 total +=  element.productID.price * element.quantity
  })
  return total
}
// const GotoPayment = () =>{
//   nav("/Payment")
// }
const Totalcart = () =>{
  nav("/Payment/allproducts")
}
const isProductBanned = (productId) => bannedid.includes(productId);
if(Cart.length===0)
{
  return(
    <div className='cart-sub-parent'><h3 style={{color:"grey"}}>Cart-Empty</h3>
    <img src={nol} width="40px" height="40px"/></div>
  )
}
else{



  return (
    <>
    <div className='cart-parent'>
{Cart.map((product)=>(
<div key={product.productID._id} className='cart-child'>
<div className='c1'><div className='cart-imgs-container'><img className='img-cart' src={product.productID.photourl} />
<p className='st'>{bannedid.includes(product.productID.loginid) ? <label className='st-t'>Out of Stock</label>:""}</p>
</div></div>
<div className='c2'>
  <div className='cart-bname'><p className='bname'>{product.productID.brandname}</p></div>
  <div className='cart-pname'>{product.productID.productname}</div>
  </div>
  <div className='cart-d'>{product.productID.description}</div>
<div className='c3'><div className='cart-price'>₹ {product.quantity * product.productID.price}</div></div>
<div className='c4'><label className='l'>Qty :</label> <label className="cart-select" onChange={(e) => updateQuantity(product.productID._id, Math.max(1, e.target.value))} value={product.quantity}>  
<input readOnly={bannedid.includes(product.productID.loginid)}  className='inp-qty' type='number' value={product.quantity} required />
  </label></div>
<div className='c5'><Button className='d-flex justify-content-center align-items-center'   variant='contained' style={{letterSpacing:"2px",fontSize:"11px"}} color='error' onClick={()=>{remove(product.productID._id)}}>Remove<TfiTrash  fontSize={22}/></Button>
<Link 
    to={isProductBanned(product.productID.loginid) ? '#' : `/Payment/${product.productID._id}`} 
    className={`cart-buy ps-2 ${isProductBanned(product.productID.loginid) ? 'disabled-link ' : 'fs-5'}`}
    onClick={(e) => isProductBanned(product.productID.loginid) && e.preventDefault()}
>
    Buy now
</Link>
</div>

 </div>
))}

</div>

<div className='totals'><p className='ts pt-3 me-3 fs-4 '>₹ {total()}</p>
<Button variant='contained' style={{letterSpacing:"3px"}} onClick={()=>Totalcart()} >Place Order<PiShoppingCart className='i'/></Button>
</div>


</>
  )
}
}
