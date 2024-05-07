import React, { useEffect, useState } from 'react'
import { toast, Flip } from "react-toastify";
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { BsSortDown,BsSortUp } from "react-icons/bs";
import Stack from 'react-bootstrap/Stack';
import { IoHeartSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import GetID from './Hooks/GetId'
import { useCookies } from 'react-cookie'
import nol from "./background/nol.png"
export default function Category1() {
    const [Cookies,] = useCookies(["token"])
    const [Liked,setLiked] = useState([])
    const {brandname} = useParams()
    const [selectedstrapcolor, setSelectedstrapcolor] = useState(null);
const [selectedbody, setSelectedbody] = useState(null);
    const [Filtered,setFiltered] = useState([])
    const [Filteredk,setFilteredk] = useState([])
    const [filtertogw,setFiltertogw] = useState(0)
    const [opstraptog,setOpstraptog] = useState(0)
    const [opbodytog,setOpbodytog] = useState(0)
    const [sbtog,setsbtog] = useState(0)
    console.log("body",selectedbody)
    console.log("color",selectedstrapcolor)
    console.log("filtered",Filtered)
    const userID = GetID()
    useEffect(()=>{
     
        fetchproductcat()
        fetchliked()
    },[])
    const fetchproductcat = async ()=>{
      try{

          const response = await axios.get(`http://localhost:5000/Product/getProduct/particular/${userID}`,{
              params: {
              only: brandname,
                
                },
              headers:{
                  Authorization:`${Cookies.token}`
              }
          })
          setFiltered(response.data.products)
          setFilteredk(response.data.products)
      }
   catch(error){
      toast.error(error.response.data.message, {
          transition: Flip,
          toastId: "unique-toast-id",
        });
               }
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
      useEffect(() => {
        // Move the filtering logic here
        const filterwatches = Filtered.filter(element=>element.category === "watch")
      
        if (selectedstrapcolor) {
          setFilteredk(
            filterwatches.filter(
              (element) =>
                element.strapcolor.toLowerCase() === selectedstrapcolor.toLowerCase()
            )
          );
         
        }
        else  if (selectedbody) {
          setFilteredk(
            filterwatches.filter(
              (element) => element.body.toLowerCase() === selectedbody.toLowerCase()
            )
          );
  
        }
        else {
          // If no material is selected, just use the original filterbags
          setFilteredk(filterwatches);
       
        }
      
      
      
      }, [selectedbody, selectedstrapcolor,Filtered]);
      const handlewatchfilterTog  =()=>{
        setFiltertogw(1)
      }
      const handlestrap = ()=>{
        setOpstraptog(1)
        setsbtog(1)
        setOpbodytog(0)
      }
      const handlebody = () =>{
        setOpbodytog(1)
        setOpstraptog(0)
        setsbtog(1)
      }
      const Closew = () =>{
        setFiltertogw(0)
        setsbtog(0)
        setSelectedstrapcolor(null);
        setSelectedbody(null);
      }
      const handlebodyChange = (body) =>{
    setSelectedbody(body)
      }
      const handlestrapChange = (color) =>{
        setSelectedstrapcolor(color)
      }
      const uniquebody = Array.from(new Set(Filteredk.map(u => u.body)));
      const uniquestrapcolor = Array.from(new Set(Filteredk.map(u => u.strapcolor)));
  return (
    <>
      {Filteredk.length !==0 && <><div className='srt-parent'>
      <Stack direction="horizontal" gap={2}>
      <Badge style={{
        boxShadow:"0px 0px 5px 0px grey",
        cursor:"pointer",
      
      }} onClick={hightoLow} bg="white"><BsSortDown style={{
        fontSize:"25px",
        color:"blue"
      }} /></Badge>
      <Badge style={{
        boxShadow:"0px 0px 5px 0px grey",
        cursor:"pointer",
       
      }} onClick={lowtoHigh} bg="white"><BsSortUp style={{
        fontSize:"25px",
        color:"slategrey",
       
      }}/></Badge>
       {filtertogw===1 ?
        <>
        {sbtog===1 ? <>
        
        {opstraptog===1 && (<>
          {uniquestrapcolor && uniquestrapcolor.map((data,index)=>(
                          <>
                               <label>{data}</label>
                          <input
                          
                            checked={selectedstrapcolor === `${data}`}
                            onChange={() => handlestrapChange(data)}
                            type="radio"
                          />
                          </>

                        ))}
        <button onClick={Closew} style={{
         border:"none",
         backgroundColor:"transparent"
        }}><IoIosClose style={{
   fontSize:"25px",
   color:"grey"
        }}/></button>
        </>)}
        {opbodytog===1 && (<>
          {uniquebody && uniquebody.map((data,index)=>(
                          <>
                           <label>{data}</label>
                             <input
                        
                            checked={selectedbody ===`${data}`}
                            onChange={() => handlebodyChange(data)}
                            type="radio"
                          />
                         
                          </>
                        ))}
                         
          <button onClick={Closew} style={{
                border:"none",
                backgroundColor:"transparent"
        }}><IoIosClose style={{
          fontSize:"25px",
          color:"grey"
        }} /></button>
        </>)}
        </> :
        
        <> <button className='mt' onClick={handlestrap}>Strapcolor</button>
        <button className='cy' onClick={handlebody}>Body</button></>}
       
        </>
      
      :<Badge style={{
        boxShadow:"0px 0px 2px 0px grey",
        cursor:"pointer",
    color:"black",
    fontWeight:"500",
    padding:"8.5px 10px"
      }} onClick={handlewatchfilterTog} bg="white" ><IoIosArrowForward style={{
        fontSize:"18px",
     
      }} /></Badge>}
      </Stack>
      </div></> 
      }
      {Filteredk.length===0 &&   <div className='srt-parent '><h3 style={{color:"grey"}}>Product Un-available</h3>
  <img src={nol} className='ms-2 ' width="40px" height="40px"/>
  </div>}
    <div className='srt-sub-parent'>
    
  
    {Filteredk.map((product)=>(
     
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
    </>
  )
}
