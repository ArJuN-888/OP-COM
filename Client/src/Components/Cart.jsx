import React from 'react'
import axios from 'axios';
import { PiShoppingCart } from "react-icons/pi";
import "../Styles/Cart.css"
import { useEffect,useState } from 'react'
import { TfiTrash } from "react-icons/tfi";
import { IoCloseOutline } from "react-icons/io5";
import {  toast,Flip} from 'react-toastify';
import { useCookies } from "react-cookie";
import GetID from './Hooks/GetId';
export default function Cart() {
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
    toast(error.response.data.message,{
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
if(Cart.length===0)
{
  return(
    <div className='cart-parent'><h1 className='emp'> Cart Empty</h1></div>
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
<div className='c3'><div className='cart-price'>₹ {product.quantity * product.productID.price}</div></div>
<div className='c4'><label className='l'>Qty :</label> <label className="cart-select" onChange={(e) => updateQuantity(product.productID._id, Math.max(1, e.target.value))} value={product.quantity}>  
<input readOnly={bannedid.includes(product.productID.loginid)}  className='inp-qty' type='number' value={product.quantity} required />
  </label></div>
<div className='c5'><button  className='cart-b' onClick={()=>{remove(product.productID._id)}}>Remove<TfiTrash  className='i'/></button>
<button  disabled={bannedid.includes(product.productID.loginid)} className='cart-buy'>Buy now</button>
</div>

</div>
))}

</div>
<div className='dv'>
<div className='totals'><p className='ts'>₹ {total()}</p>
<button className='buy'>Place Order<PiShoppingCart className='i'/></button>
</div>
</div>

</>
  )
}
}
