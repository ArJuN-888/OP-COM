import React, { useEffect, useState } from 'react'
import { toast, Flip } from "react-toastify";
import axios from 'axios'
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { BsSortDown,BsSortUp } from "react-icons/bs";
import { IoHeartSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import GetID from './Hooks/GetId'
import { IoIosClose } from "react-icons/io";
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import nol from "./background/nol.png"
export default function Category2() {
    const [Cookies,] = useCookies(["token"])
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [selectedCapacity, setSelectedCapacity] = useState(null);
    const [Liked,setLiked] = useState([])
    const [Filtered,setFiltered] = useState([])
    const [Filteredk,setFilteredk] = useState([])
    const [filtertog,setFiltertog] = useState(0)
    const [opmattog,setOpmattog] = useState(0)
    const [opcattog,setOpcattog] = useState(0)
    const [mctog,setmctog] = useState(0)
    console.log("filtered",Filtered)
    const {brandname} = useParams()
    const userID = GetID()
    useEffect(()=>{
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
      useEffect(() => {
        // Move the filtering logic here
        const filteredBags = Filtered.filter((element) => element.category === "bag");
      
        if (selectedMaterial) {
          setFilteredk(
            filteredBags.filter(
              (element) =>
                element.material.toLowerCase() === selectedMaterial.toLowerCase()
            )
          );
        }
        else  if (selectedCapacity) {
          setFilteredk(
            filteredBags.filter(
              (element) => parseInt(element.capacity) === parseInt(selectedCapacity)
            )
          );
        
        }
        else {
          // If no material is selected, just use the original filterbags
          setFilteredk(filteredBags);
        }
      
      
      
      }, [selectedMaterial, selectedCapacity, Filtered]);
      //filter
      const handlefilterTog = () =>{
        setFiltertog(1)
      }
     
        // filterbags = filterbags.filter(element=>element.material === filterState)
        
     
      const handlemat = () =>{
    setOpmattog(1)
    setmctog(1)
    setOpcattog(0)
      }
      const handlecap = () =>{
    setOpcattog(1)
    setOpmattog(0)
    setmctog(1)
      }
      const Close = () =>{
        setFiltertog(0)
        setmctog(0)
        setSelectedCapacity(null);
        setSelectedMaterial(null);
      }
      const handleMaterialChange = (material) => {
        setSelectedMaterial(material);
      };
      
      const handleCapacityChange = (capacity) => {
        setSelectedCapacity(capacity);
      };
      const uniquematerial = Array.from(new Set(Filteredk.map(u => u.material)));
      const uniquecapacity = Array.from(new Set(Filteredk.map(u => u.capacity)));
  return (
    <>
         {Filteredk.length===0 &&   <div className='srt-parent '><h3 style={{color:"grey"}}>Product Un-available</h3>
  <img src={nol} className='ms-2 ' width="40px" height="40px"/>
  </div>}
   {Filteredk.length !== 0 && <><div className='srt-parent'>
      <Stack direction="horizontal" gap={2}>
      <Badge style={{
        boxShadow:"0px 0px 5px 0px grey",
        cursor:"pointer"
      }} onClick={hightoLow} bg="white"><BsSortDown style={{
        fontSize:"25px",
        color:"blue"
      }} /></Badge>
      <Badge style={{
        boxShadow:"0px 0px 5px 0px grey",
        cursor:"pointer"
      }} onClick={lowtoHigh} bg="white"><BsSortUp style={{
        fontSize:"25px",
        color:"slategray"
      }}/></Badge>
         {filtertog===1 ?
        <>
        {mctog===1 ? <>
        
        {opmattog===1 && (<>
          {uniquematerial && uniquematerial.map((data,index)=>(
<>
<label>{data}</label>
                          <input
                         
                            checked={selectedMaterial === `${data}`}
                            onChange={() => handleMaterialChange(data)}
                            type="radio"
                          />
</>
                        ))}
        <button onClick={Close} style={{
         border:"none",
         backgroundColor:"transparent"
        }}><IoIosClose style={{
   fontSize:"25px",
   color:"grey"
        }}/></button>
        </>)}
        {opcattog===1 && (<>
          {uniquecapacity && uniquecapacity.map((data,index)=>(
                          <>
                        <label>{data}</label>
                        <input
                          checked={selectedCapacity === `${data}`}
                          onChange={() => handleCapacityChange(data)}
                          type="radio"
                        />
                        </>
                        ))}
          <button onClick={Close} style={{
                border:"none",
                backgroundColor:"transparent"
        }}><IoIosClose style={{
          fontSize:"25px",
          color:"grey"
        }} /></button>
        </>)}
        </> :
        
        <> <button className='mt' onClick={handlemat}>Material</button>
        <button className='cy' onClick={handlecap}>Capacity</button></>}
       
        </>
      
      :<Badge style={{
        boxShadow:"0px 0px 2px 0px grey",
        cursor:"pointer",
    color:"black",
    fontWeight:"500",
    padding:"8.5px 10px"
      }} onClick={handlefilterTog} bg="white" ><IoIosArrowForward style={{
        fontSize:"18px",
     
      }} /></Badge>}
      </Stack>
      </div></>
}
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
