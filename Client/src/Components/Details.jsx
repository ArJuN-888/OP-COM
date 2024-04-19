import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../Styles/Details.css"
import {  toast,Flip} from 'react-toastify';
import GetID from './Hooks/GetId';
import { IoHeartSharp } from "react-icons/io5";
import {Link, useNavigate} from "react-router-dom"
import { useCookies } from "react-cookie";
import { useParams } from 'react-router-dom'
import {Button} from "react-bootstrap"
import { FaRegCopy } from "react-icons/fa6";
import { MdOutlineSell } from "react-icons/md";
export default function Details() {
    const {productId} = useParams()
    const[Cart,setCart]= useState([])
    const [likedid,setlikedid] = useState([])
    const [Cookies] = useCookies(["token"]);
    const [bannedid,setbannedID] = useState([])
    const [Details,setDetails] = useState({})
    console.log("Details",Details)
    console.log("cart",Cart)
    const userID = GetID()
    useEffect(()=>{
        fetchlikedid()
     fetchDetails()
     getbannedid()
     fetchcart()
    },[])
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
    const nav = useNavigate()
    const fetchcart = async() =>{
      const response = await axios.get(`http://localhost:5000/User/Cart/ids/${userID}`,{
        headers:{
          Authorization:`${Cookies.token}`
        }
      }) 
      setCart(response.data.cart)
    }
    const fetchDetails = async() =>{
    const response = await axios.get(`http://localhost:5000/Product/getProduct/Details/${productId}`,{
        headers:{
          Authorization:`${Cookies.token}`
        }
      })
    setDetails(response.data)
    }
    console.log("id",productId)
    const fetchlikedid = async() =>{
        try{
          const response = await axios.get(`http://localhost:5000/User/Liked/${userID}`,{
            headers:{
              Authorization:`${Cookies.token}`
            }
          })
          setlikedid(response.data.likedlist)
        }
        catch(error){
          toast(error.response.data.message,{
            transition: Flip,
            toastId:"only one"
          })
        }
    
      }
      const checkLike = async(itemid) =>{

        if(likedid.includes(itemid))
        {
          try{
      const response = await axios.put(`http://localhost:5000/User/Liked/delete/${userID}`,{itemid},{
        headers:{
          Authorization:`${Cookies.token}`
        }
      })
      fetchlikedid()
      toast.success(response.data.message,{
        transition: Flip
      })
      
    }
    catch(error)
    {
      toast(error.response.data.message,{
        transition: Flip
      })
    }
        }
        else{
          
          try{
            console.log("dsbfmdvmvf")
            const response = await axios.put(`http://localhost:5000/User/Liked/add/${userID}`,{itemid},{
              headers:{
                Authorization:`${Cookies.token}`
              }
            })
            fetchlikedid()
            toast.success(response.data.message,{
              transition: Flip
            })
            
          }
          catch(error)
          {
            toast(error.response.data.message,{
              transition: Flip
            })
          }
       
        }
    
     
      }
      const Cartcheck = async(id) =>{
        if (Cart.find(item => item.productID === Details._id))
        {
 nav("/Cart")
        }
        else{
          try{
            const response = await axios.put(`http://localhost:5000/User/Cart/${userID}`,{id},{
              headers:{
                Authorization:`${Cookies.token}`
              }
            })
            fetchcart()
            toast.success(response.data.message,{
              transition: Flip
            })
              }
              catch(error)
              {
                toast(error.response.data.message,{
                  transition: Flip
                })
              }
          }
   
      }
      const handleCopy = (id) =>{
       navigator.clipboard.writeText(id)
       toast("Copied to Clipboard",{
        transition: Flip
      })
      }
      const isProductBanned = (productId) => bannedid.includes(productId);
  return (
    <div className='Details-parent'>
      
{/*    

 
   
    
      </div> */}
      <div className='photo-contain'>
      <div className='imgs-details'>   <button onClick={()=>{checkLike(Details._id)}} className='likes'>{likedid.includes(Details._id) ? <IoHeartSharp className='likeicons'/>:<IoHeartSharp className='likeiconf'/>}</button><img className='im-d' src={Details.photourl} /></div>
      <div className='btn-grps'>
        <button onClick={()=>{Cartcheck(Details._id)}} className='cart-btn'>{Cart.find(item=> item.productID === Details._id )? "Go-to-Cart" : "Add-To-Cart"}</button>
        <Link 
        style={{paddingLeft:"32px"}}
    to={isProductBanned(Details.loginid) ? '#' : `/Payment/${Details._id}`} 
    className={`buy-btn  ${isProductBanned(Details.loginid) ? 'disabled-link' : ''}`}
    onClick={(e) => isProductBanned(Details.loginid) && e.preventDefault()}
>
    Buy now
</Link>
      </div>
      </div>
      <div className='details-contain'>
      <div className='brand'><mark className='brand-sub'>{Details.brandname}</mark></div>
      <div className='fs-6'>Id : {Details._id}<Button style={{boxShadow:"0px 0px 5px 0px grey ",border:"none",borderRadius:"0.2rem",backgroundColor:"transparent"}} className='ms-2 fs-6 ps-2 pe-2 pt-1 pb-1' onClick={()=>handleCopy(Details._id)} ><FaRegCopy className='fs-6' color='black'/></Button></div>
    <div className='pn'>Model :  {Details.productname}</div>
    <div className='pd'>{Details.description}</div>
    <div className='pd'>Ideal for : {Details.genderprefer}</div>
    
    {Details.category === "bag" ?  <> <div className='pd'>Material : {Details.material}</div>
    <div className='pd'>Capacity : {Details.capacity}</div></> : <><div className='pd'>Strap color : {Details.strapcolor}</div>
    <div className='pd'>Body : {Details.body}</div></>}
  
    <div>{bannedid.includes(Details.loginid) ? <label className='out-st mt-4'>Currently Out of Stock</label>: <div className='sto'>Stoke-left  : {Details.stoke} </div>}</div>
   
     <div className='pp'><MdOutlineSell/> ₹ {Details.price}</div>
      </div>
    </div>
  )
}
