import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import "../Styles/Home.css"
import GetID from './Hooks/GetId';
import { IoHeartSharp } from "react-icons/io5";
import Badge from 'react-bootstrap/Badge';
import { BsSortDown,BsSortUp } from "react-icons/bs";
import Stack from 'react-bootstrap/Stack';
import {  toast,Flip} from 'react-toastify';
import Carousel from 'react-bootstrap/Carousel';
import { IoSend } from 'react-icons/io5';
import { useCookies } from "react-cookie";
export default function Home() {
  const [Liked,setLiked] = useState([])
  
  const [Cookies] = useCookies(["token"]);
  const [allproducts,setallProducts] = useState([])
  const [reportstatement,setReportstatement] = useState("")
  const [toggle,setToggle] = useState(0)
  console.log("liked",Liked)
  const [dateandtime,] = useState(new Date());
  const dt = dateandtime.toLocaleString()
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
  const ToggleInput = () =>{
setToggle(1)
  }
  const ToggleCancel = () =>{
    setToggle(0)
  }
  const Reportproceed = async() =>{
    try{
 const response = await axios.post("http://localhost:5000/Report/reports",{userID:userID,reportstatement,dt},{
  headers:{
    Authorization:`${Cookies.token}`
  }
})
 setToggle(0)
 setReportstatement("")
 toast.success(response.data.message,{
  transition: Flip
})
    }
    catch(error){
      toast(error.response.data.message,{
        transition: Flip
      })
    }
  }
  const hightoLow = () =>{
    const data = [...allproducts]
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
setallProducts(data)
  }
  const lowtoHigh = () => {
    let swapped
    const data = [...allproducts]
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
    setallProducts(data)
  }
  const filterbags = allproducts.filter(element=>element.category === "bag")
  console.log("filterbag",filterbags)
  const filterwatch = allproducts.filter(element=>element.category === "watch")
  console.log("filterwatch",filterwatch)
  return (
    <>

{/* <Carousel fade className='caro'>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src="https://www.sonatawatches.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-SonataSharedLibrary/default/dwda930b92/images/homepage/desktop/SF-D.jpg"
          alt="First slide"
       
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src="https://www.sonatawatches.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-SonataSharedLibrary/default/dw9a40b6ca/images/homepage/desktop/NewArrivals-D.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src="https://www.sonatawatches.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-SonataSharedLibrary/default/dwda930b92/images/homepage/desktop/SF-D.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>


        <div className='side-menu'>
      <ul className='side-ul'>
        <li className='side-li'><Link to="/Titan" className='side-lnk'><img src="https://logos-download.com/wp-content/uploads/2016/06/Titan_Watches_logo.png" width="110px"  /></Link></li>
        <li className='side-li'><Link to="/Casio" className='side-lnk'><img src="https://iconspng.com/images/casio-logo.jpg"  width="100px"/></Link></li>
        <li className='side-li-f'><Link to="/Fastrack" className='side-lnk'><img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Fastrack_logo.png"  width="100px"/></Link></li>
        <li className='side-li'><Link to="/Sonata" className='side-lnk'><img src="https://vectorseek.com/wp-content/uploads/2023/08/Hyundai-Sonata-Logo-Vector.svg-.png" width="110px"/></Link></li>
      </ul>
      </div>  */}
      {/* <div className='srt-parent-home'>
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
        color:"slategrey"
      }}/></Badge>
      </Stack>
      </div> */}
    <div className='home-parent'>
      <div className='sub-pr-parent'>
        <div className='bag-parent'>
   
{filterbags.map((product)=>(
 
<div key={product._id} className='home-child'>
 <Link className='homelink' to={`/Details/${product._id}`} >
<button onClick={(e)=>{checkLike(product._id);e.preventDefault()}} className='like'>{Liked.includes(product._id) ? <IoHeartSharp className='likeicons'/>:<IoHeartSharp className='likeicon'/>}</button>
{/* <div className="prof-id">{product.loginid}</div> */}
<div className='imgs-container'><img className='imgs' src={product.photourl} /></div>
<div className='pnames '><label style={{color:"black"}}>{product.brandname}</label></div>
<div className='pnam'>{product.description}</div>
<div className='pprice'>₹ {product.price}</div>
 </Link>
  </div>
 
))}
</div>
<div className='watch-parent'>

{filterwatch.map((product)=>(
 
 <div key={product._id} className='home-child'>
  <Link className='homelink' to={`/Details/${product._id}`} >
 <button onClick={(e)=>{checkLike(product._id);e.preventDefault()}} className='like'>{Liked.includes(product._id) ? <IoHeartSharp className='likeicons'/>:<IoHeartSharp className='likeicon'/>}</button>
 {/* <div className="prof-id">{product.loginid}</div> */}
 <div className='imgs-container'><img className='imgs' src={product.photourl} /></div>
 <div className='pnames '><label style={{color:"black"}}>{product.brandname}</label></div>
 <div className='pnam'>{product.description}</div>
 <div className='pprice'>₹ {product.price}</div>
  </Link>
   </div>
  
 ))}
 </div>
 </div>
</div>

{/* <div className='report-parent'>
  <label className='t'>Specify your experience/reports by just Clicking the button below</label>
<div className='report-child'> 
  {toggle === 1 ? 
 <>
     <input
     value={reportstatement}
     onChange={(e)=>setReportstatement(e.target.value)}
     className='input-report'
     placeholder='Specify here... '
     />
     <button className='report-btn-Proceed'  onClick={Reportproceed} >Send <IoSend/></button>
  <button className='report-btn-cancel'  onClick={ToggleCancel} >Cancel</button>
  </>
  :
  <div><button className='report-btn-invoke' onClick={ToggleInput}>Comments/Reports</button></div>}
  </div>
</div> */}
   </>
  )
}
