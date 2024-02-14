import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
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
  return (
    <div className='home-parent'>
      
{searchresult.map((product)=>(
 
<div key={product._id} className='home-child'>
 <Link className='homelink' to={`/Details/${product._id}`} >
<button onClick={(e)=>{checkLike(product._id);e.preventDefault()}} className='like'>{Liked.includes(product._id) ? <IoHeartSharp className='likeicons'/>:<IoHeartSharp className='likeicon'/>}</button>
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
