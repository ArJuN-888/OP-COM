import React, { useEffect, useState } from 'react'
import { toast, Flip } from "react-toastify";
import axios from 'axios'
import { IoHeartSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import GetID from './Hooks/GetId'
import { useCookies } from 'react-cookie'
export default function Fastrack() {
    const [Cookies,] = useCookies(["token"])
    const [Liked,setLiked] = useState([])
    const [Filtered,setFiltered] = useState([])
    console.log("filtered",Filtered)
    const userID = GetID()
    useEffect(()=>{
        const fetchproductcat = async ()=>{
            try{

                const response = await axios.get(`http://localhost:5000/Product/getProduct/particular/${userID}`,{
                    params: {
                    only: "fastrack",
                      
                      },
                    headers:{
                        Authorization:`${Cookies.token}`
                    }
                })
                setFiltered(response.data.products)
            }
         catch(error){
            toast.error(error.response.data.message, {
                transition: Flip,
                toastId: "unique-toast-id",
              });
                     }
        }
        fetchproductcat()
        fetchliked()
    },[])
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
      
    {Filtered.map((product)=>(
     
    <div key={product._id} className='home-child'>
     <Link className='homelink' to={`/Details/${product._id}`} >
    <button onClick={(e)=>{checkLike(product._id);e.preventDefault()}} className='like'>{Liked.includes(product._id) ? <IoHeartSharp className='likeicons'/>:<IoHeartSharp className='likeicon'/>}</button>
    <div className='imgs-container'><img className='imgs' src={product.photourl} /></div>
    <div className='pnames'><mark className='pname'>{product.brandname}</mark></div>
    <div className='pnam'>{product.productname}</div>
    <div className='pprice'>₹ {product.price}</div>
     </Link>
      </div>
     
    ))}
    </div>
  )
}
