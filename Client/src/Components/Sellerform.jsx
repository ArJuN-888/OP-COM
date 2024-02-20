import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GetID from './Hooks/GetId'
import "../Styles/Sellerform.css"
import { useCookies } from 'react-cookie'
import {  toast,Flip} from 'react-toastify';
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
  
    const handleChange = (key,value) =>{
      setSellerform({...sellerform,[key]:value})
     }
 
    const HandleFile = (e) =>{
      setFile(e.target.files[0])
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
      <input
      placeholder='username...'
      value={sellerform.username}
      onChange={(e)=>handleChange("username",e.target.value)}
      />
       <input
       placeholder='email...'
      value={sellerform.email}
      onChange={(e)=>handleChange("email",e.target.value)}
      />
       {/* <input
       placeholder='category...'
      value={sellerform.category}
      onChange={(e)=>handleChange("category",e.target.value)}
      /> */}
      <select value={sellerform.category} onChange={(e)=>handleChange("category",e.target.value)}>
        <option value="watch">Watch</option>
        <option value="bags">Bags</option>
      </select>
       <input
       placeholder='address...'
      value={sellerform.address}
      onChange={(e)=>handleChange("address",e.target.value)}
      />
       <input
       placeholder='description...'
      value={sellerform.description}
      onChange={(e)=>handleChange("description",e.target.value)}
      />
       <input
  
   
   
       placeholder='phonenumber...'
      value={sellerform.phno}
      type='number'
      onChange={(e)=>handleChange("phno",e.target.value)}
      />
        <input
        type='file'
      onChange={HandleFile}
      />
     <button onClick={submitRequest}>Submit_request</button>
   
    </div>
  )
}
