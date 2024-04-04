import React, { useEffect, useState } from 'react'
import axios from 'axios'
import nol from "./background/nol.png"
import "../Styles/Home.css"
import GetID from './Hooks/GetId';
import { GoHeart } from "react-icons/go";
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { BsSortDown,BsSortUp } from "react-icons/bs";
import { IoHeartSharp } from "react-icons/io5";
import {  toast,Flip} from 'react-toastify';
import { useCookies } from "react-cookie";
import { MdOutlineSell } from "react-icons/md";
export default function Liked() {
  const [likedid,setlikedid] = useState([])
  const [Likedproduct,setLikedproduct] = useState([])
  const [Cookies] = useCookies(["token"]);
const [bannedid,setbannedID] = useState([])
  const userID = GetID()
  console.log("idfromcart",likedid)
  console.log("likedfull",Likedproduct)
  useEffect(()=>{
    if(Cookies.token)
    {
      fetchlikedid()
      getbannedid()
      fetchliked()

    }

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
  const hightoLow = () =>{
    const data = [...Likedproduct]
    let swapped
do{
swapped = false
 for(let i=0;i<data.length-1;i++)
 {
  if(data[i].price < data[i+1].price)
  {
   let temp = data[i]
    data[i]=data[i+1]
    data[i+1] = temp
    swapped = true
  }
 }
}while(swapped)
setLikedproduct(data)
  }
  const lowtoHigh = () => {
    let swapped
    const data = [...Likedproduct]
    do{
     swapped = false
      for(let i=0;i<data.length-1;i++)
      {
       if(data[i].price > data[i+1].price)
       {
        let temp = data[i]
         data[i]=data[i+1]
         data[i+1] = temp
         swapped = true
       }
      }
    }while(swapped)
    setLikedproduct(data)
  }
  if(Likedproduct.length === 0)
  {
return(
  <div className='srt-parent'><h3 style={{color:"grey"}}>Wishlist-Empty</h3>
  <img src={nol} width="40px" height="40px"/>
  </div>
)
  }
  else{
    return (
      <>
     <div className='srt-parent'>
      <Stack direction="horizontal" gap={2}>
      <Badge onClick={hightoLow} style={{
        boxShadow:"0px 0px 5px 0px grey",
      
      }} bg="white"><BsSortDown style={{
        fontSize:"25px",
        color:"blue",
        cursor:"pointer"
      }} /></Badge>
      <Badge style={{
        boxShadow:"0px 0px 5px 0px grey"
      }} onClick={lowtoHigh} bg="white"><BsSortUp style={{
        fontSize:"25px",
        color:"slategrey",
        cursor:"pointer"
      }}/></Badge>
      </Stack>
      </div>
    <div className='srt-sub-parent'>
      
{Likedproduct.map((product)=>(
<div key={product._id} className='home-child'>
<Link className='homelink' to={`/Details/${product._id}`} >
<button onClick={(e)=>{checkLike(product._id);e.preventDefault()}} className='like'>{likedid.includes(product._id) ? <IoHeartSharp className='likeicons'/>:<GoHeart className='likeicon'/>}</button>
{/* <div className="prof-id">{product.loginid}</div> */}
<div className='imgs-container'><img className='imgs' src={product.photourl} /></div>
<div className='pnames'><label  style={{color:"black"}}>{product.brandname}</label></div>
<div className='pnam'>{product.description}</div>
<div className='pprice'>  <label><MdOutlineSell /> ₹ {product.price}{" "}</label></div>
<div>{bannedid.includes(product.loginid) ? <label className='out-st'>Out of Stock</label>:""}</div>
</Link>
  </div>
))}
</div>
</>
)
  }
 

   
  
}
