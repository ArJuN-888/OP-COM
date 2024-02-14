import React, { useState } from 'react'
import axios from "axios"
import "../Styles/AdminLogin.css"
import {useCookies} from "react-cookie"
import { useNavigate } from 'react-router-dom'
import {  toast,Flip} from 'react-toastify';
export default function Adminlogin() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [,setCookie] = useCookies(["admintoken"])
  const nav = useNavigate()
  const handleSubmit = async () =>{
    try{
      const response = await axios.post("http://localhost:5000/Admin/Login",{email,password})
      setCookie("admintoken",response.data.token)
      localStorage.setItem("adminID",response.data.adminID)
      nav("/Adminhome")
      toast.success(response.data.message,{
        transition: Flip
      })
   
    }
    catch(error)
    {
      toast.error(error.response.data.message,{
        transition: Flip
      })
    }
  
  
  }
  return (
    <div className='adminlog-parent'>
      <input
      placeholder='email...'
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />
      <input
      placeholder='password...'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  )
}
