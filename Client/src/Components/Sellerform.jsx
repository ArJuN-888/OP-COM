import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GetID from './Hooks/GetId'
import { FaSellcast } from "react-icons/fa6";
import "../Styles/Sellerform.css"
import { useCookies } from 'react-cookie'
import Spinner from 'react-bootstrap/Spinner';
import {  toast,Flip} from 'react-toastify';
import { FaCloudUploadAlt } from 'react-icons/fa';
export default function Sellerform() {
  const userID = GetID()
  
  const [sellerform,setSellerform] = useState({
    userID:userID,
    username:"",
    email:"",
    category:"",
    address:"",
    description:"",
    phno:"",
    pending:true,
    notify:true,
  })
console.log("sellerfrm",sellerform)
    const [Cookies,] = useCookies(["token"]);
    const [File,setFile] = useState(null)
    const [filename,setFilename] = useState("")
    const handleChange = (key,value) =>{
      setSellerform({...sellerform,[key]:value})
     }
 
    const HandleFile = (e) =>{
      setFile(e.target.files[0])
      setFilename(e.target.files[0].name)
    }
const submitRequest = async() =>{
    try{
      const formData = new FormData();
      formData.append("image", File);//image key  specfies  multer field name that is also specified in the multer-config they should match
      console.log("formdata",formData)
      // Append other form fields to the formData
      Object.keys(sellerform).forEach((key) => {
        formData.append(key, sellerform[key]);
      
      });
      
        const response = await axios.post("http://localhost:5000/User/SellerRegistartion",formData,{
            headers:{
                Authorization:`${Cookies.token}`
            }
         })
        toast.success(response.data.message,{
            transition:Flip
          })
    }
catch(error)
{
    toast.error(error.response.data.message,{
        transition:Flip
      })
}
}

  return (
    <div className='seller-parent'>
      <h3 style={{
        color:"grey"
      }}>Fill Your Seller Identity <FaSellcast /> </h3>
      <div className='s-frm'>
      <input
      className='i1'
      placeholder='username...'
      value={sellerform.username}
      onChange={(e)=>handleChange("username",e.target.value)}
      />
       <input
       className='i1'
       placeholder='email...'
      value={sellerform.email}
      onChange={(e)=>handleChange("email",e.target.value)}
      />
       {/* <input
       placeholder='category...'
      value={sellerform.category}
      onChange={(e)=>handleChange("category",e.target.value)}
      /> */}
      <select className='slt-req' value={sellerform.category} onChange={(e)=>handleChange("category",e.target.value)}>
      <option value="" disabled  >select</option>
        <option value="watch">Watches</option>
        <option value="bags">Bags</option>
      </select>
       <input
       className='i1'
       placeholder='address...'
      value={sellerform.address}
      onChange={(e)=>handleChange("address",e.target.value)}
      />
       <input
       className='i1'
       placeholder='Sales entity title...'
      value={sellerform.description}
      onChange={(e)=>handleChange("description",e.target.value)}
      />
       <input
       className='i1'
       placeholder='phonenumber...'
      value={sellerform.phno}
      type='number'
      onChange={(e)=>handleChange("phno",e.target.value)}
      />
     <div className='d-flex gap-4'>
     <div><label className='mt-2'>
       <FaCloudUploadAlt/> ID Proof (jpg,png)
       
      <input
      type='file'
      onChange={HandleFile}
      className='ipt'
     />
     </label>
     </div> 
     <p className='mt-2'>{!filename ? "No file choosen...": filename}</p>
     </div>
     <button className='req-s' onClick={submitRequest}><span> Submit-request</span> <Spinner animation="grow" variant="white" size="sm"/></button>
     </div>
    </div>
  )
}
