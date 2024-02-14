import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../Styles/Home.css"
import GetID from './Hooks/GetId';
import { GoHeart } from "react-icons/go";
import { IoHeartSharp } from "react-icons/io5";
import {  toast,Flip} from 'react-toastify';
import { useCookies } from "react-cookie";
export default function Liked() {
  const [likedid,setlikedid] = useState([])
  const [Likedproduct,setLikedproduct] = useState([])
  const [Cookies] = useCookies(["token"]);
  const userID = GetID()
  console.log("idfromcart",likedid)
  console.log("likedfull",Likedproduct)
  useEffect(()=>{
    if(Cookies.token)
    {
      fetchlikedid()
      fetchliked()
    }

  },[])
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
  const fetchliked = async() =>{
    try{
      const response = await axios.get(`http://localhost:5000/User/Liked/full/${userID}`,{
        headers:{
          Authorization:`${Cookies.token}`
        }
      })
      console.log("sdfgmhdgjdrg",response.data)
      setLikedproduct(response.data)
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
  toast.success(response.data.message,{
    transition: Flip
  })
  fetchliked()
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
        toast.success(response.data.message,{
          transition: Flip
        })
        fetchliked()
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
    <div className='home-parent'>
      
{Likedproduct.map((product)=>(
<div key={product._id} className='home-child'>
<button onClick={()=>{checkLike(product._id)}} className='like'>{likedid.includes(product._id) ? <IoHeartSharp className='likeicons'/>:<GoHeart className='likeicon'/>}</button>
{/* <div className="prof-id">{product.loginid}</div> */}
<div className='imgs-container'><img className='imgs' src={product.photourl} /></div>
<div className='pname'><mark>{product.brandname}</mark></div>
<div className='pname'>{product.productname}</div>
<div className='pprice'>₹ {product.price}</div>
  </div>
))}
</div>
   
  )
}
