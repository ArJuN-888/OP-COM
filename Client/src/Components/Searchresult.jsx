import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../Styles/Search.css"
import { useCookies } from 'react-cookie'
import empty from "./background/empty.png"
import GetID from './Hooks/GetId';
import { IoHeartSharp } from "react-icons/io5";
import {  toast,Flip} from 'react-toastify';
import { useParams,Link } from 'react-router-dom'
export default function Searchresult() {
  const {category} = useParams()
  const [Liked,setLiked] = useState([])
  const [Cookies,] = useCookies(["token"]);
  const [searchresult,setSearchresult] = useState([])
  const userID = GetID()
  console.log("category",category)
  console.log("srchresult",searchresult)
  console.log("liked",Liked)
  useEffect(()=>{
fetchSearch()
  },[category])
  const fetchSearch = async () =>{
  const response = await axios.get(`http://localhost:5000/Product/getProduct/bycategory/${userID}`,{

  
  params: {
    category: category,
    
  
  },
    headers:{
      Authorization:`${Cookies.token}`
    }
    } )
    fetchliked()
   setSearchresult(response.data.products)
  
  }
  const fetchliked = async() =>{
    try{
      const response = await axios.get(`http://localhost:5000/User/Liked/${userID}`,{
        headers:{
          Authorization:`${Cookies.token}`
        }
      })
      setLiked(response.data.likedlist)
    }
    catch(error){
      toast(error.response.data.message,{
        transition: Flip,
        
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
  if(searchresult.length === 0)
  {
    return(
      <div className='Search-parent'><h3 style={{color:"grey"}}>Un-available</h3>
      <img src={empty} width="50px" height="50px"/>
      </div>
    )
  }
  else{

  
  return (
    <div className='Search-parent'>
      
{searchresult.map((product)=>(
 
<div key={product._id} className='home-child'>
 <Link className='homelink' to={`/Details/${product._id}`} >
<button onClick={(e)=>{checkLike(product._id);e.preventDefault()}} className='like'>{Liked.includes(product._id) ? <IoHeartSharp className='likeicons'/>:<IoHeartSharp className='likeicon'/>}</button>
<div className='imgs-container'><img className='imgs' src={product.photourl} /></div>
<div className='pnames '><label style={{color:"black"}}>{product.brandname}</label></div>
<div className='pnam'>{product.description}</div>
<div className='pprice'>₹ {product.price}  {product.prevprice > product.price ?<div className='position-r'>{product.prevprice}<label className='position-a'></label></div> :<></> }</div>

 </Link>
  </div>
 
))}
</div>
  )
}
}
