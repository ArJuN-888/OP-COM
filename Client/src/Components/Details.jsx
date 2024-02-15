import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../Styles/Details.css"
import {  toast,Flip} from 'react-toastify';
import GetID from './Hooks/GetId';
import { GoHeart } from "react-icons/go";
import { IoHeartSharp } from "react-icons/io5";
import {useNavigate} from "react-router-dom"
import { useCookies } from "react-cookie";
import { useParams } from 'react-router-dom'
export default function Details() {
    const {productId} = useParams()
    const[Cart,setCart]= useState([])
    const [likedid,setlikedid] = useState([])
    const [Cookies] = useCookies(["token"]);
    const [Details,setDetails] = useState({})
    console.log("Details",Details)
    console.log("cart",Cart)
    const userID = GetID()
    useEffect(()=>{
        fetchlikedid()
     fetchDetails()
     fetchcart()
    },[])
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
  return (
    <div className='Details-parent'>
      
{/*    

 
   
    
      </div> */}
      <div className='photo-contain'>
      <div className='imgs-details'>   <button onClick={()=>{checkLike(Details._id)}} className='likes'>{likedid.includes(Details._id) ? <IoHeartSharp className='likeicons'/>:<IoHeartSharp className='likeiconf'/>}</button><img className='im-d' src={Details.photourl} /></div>
      <div className='btn-grps'>
        <button onClick={()=>{Cartcheck(Details._id)}} className='cart-btn'>{Cart.find(item=> item.productID === Details._id )? "Go-to-Cart" : "Add-To-Cart"}</button>
        <button className='buy-btn'>Buy-Now</button>
      </div>
      </div>
      <div className='details-contain'>
      <div className='brand'><mark className='brand-sub'>{Details.brandname}</mark></div>
    <div className='pn'>{Details.productname}</div>
    <div className='pd'>{Details.description}</div>
    <div className='sto'>Available-Stoke-{Details.stoke}</div>
     <div className='pp'>₹ {Details.price}</div>
      </div>
    </div>
  )
}
