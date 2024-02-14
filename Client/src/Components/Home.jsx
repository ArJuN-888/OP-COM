import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import "../Styles/Home.css"
import GetID from './Hooks/GetId';
import { IoHeartSharp } from "react-icons/io5";
import {  toast,Flip} from 'react-toastify';
import { useCookies } from "react-cookie";
export default function Home() {
  const [Liked,setLiked] = useState([])
  const [Cookies] = useCookies(["token"]);
  const [allproducts,setallProducts] = useState([])
  console.log("liked",Liked)
  const userID = GetID()
  console.log("allproducts",allproducts)

  useEffect(()=>{
 
      fetchProduct()
      fetchliked()
    

  },[])
  const fetchProduct = async() =>{
    try{
      const response = await axios.get(`http://localhost:5000/Product/getProduct/idforstat/${userID}`,{
        headers :{
          Authorization:`${Cookies.token}`
        }
      })
      setallProducts(response.data.products)
     
    }
 catch(error)
 {
  toast(error.response.data.message,{
    transition: Flip
  })
 }
  }
  const fetchliked = async() =>{
    try{
      const response = await axios.get(`http://localhost:5000/User/Liked/${userID}`,{
        headers:{
          Authorization:`${Cookies.token}`
        }
      })
      fetchProduct()
      setLiked(response.data.likedlist)
    }
    catch(error){
      toast(error.response.data.message,{
        transition: Flip,
        toastId:"only one"
      })
    }

  }
  const checkLike = async(itemid) =>{

    if(Liked.includes(itemid))
    {
      try{
  const response = await axios.put(`http://localhost:5000/User/Liked/delete/${userID}`,{itemid},{
    headers:{
      Authorization:`${Cookies.token}`
    }
  })
  fetchProduct()
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
      
{allproducts.map((product)=>(
 
<div key={product._id} className='home-child'>
 <Link className='homelink' to={`/Details/${product._id}`} >
<button onClick={(e)=>{checkLike(product._id);e.preventDefault()}} className='like'>{Liked.includes(product._id) ? <IoHeartSharp className='likeicons'/>:<IoHeartSharp className='likeicon'/>}</button>
{/* <div className="prof-id">{product.loginid}</div> */}
<div className='imgs-container'><img className='imgs' src={product.photourl} /></div>
<div className='pname'><mark className='pname'>{product.brandname}</mark></div>
<div className='pnam'>{product.productname}</div>
<div className='pprice'>₹ {product.price}</div>
 </Link>
  </div>
 
))}
</div>
   
  )
}
