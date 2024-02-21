import React, { useEffect, useState } from 'react'
import { toast, Flip } from "react-toastify";
import axios from 'axios'
import { IoHeartSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import GetID from './Hooks/GetId'
import { useCookies } from 'react-cookie'
export default function Sonata() {
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
                    only: "sonata",
                      
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
      const hightoLow = () =>{
        const data = [...Filtered]
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
   setFiltered(data)
      }
      const lowtoHigh = () => {
        let swapped
        const data = [...Filtered]
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
        setFiltered(data)
      }
  return (
    <div className='liked-parent'>
      <div>
      <button onClick={hightoLow}>Sort-H</button>
      <button onClick={lowtoHigh}>Sort-L</button>
      </div>
  
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
