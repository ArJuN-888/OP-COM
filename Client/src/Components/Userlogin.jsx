import React, { useContext, useState } from 'react'
import axios from 'axios'
import "../Styles/Userlogin.css"
import { Link,useNavigate } from 'react-router-dom'
import {useCookies} from "react-cookie"
import {  toast ,Flip} from 'react-toastify';
export default function Userlogin() {
    const [Cookies,setCookie] = useCookies(["token"])
    const [login,setlogin] = useState({
        email:"",
        password:""
    })
  const nav = useNavigate()
    const handleChange = (e) =>{
      const {name,value} = e.target
      setlogin({...login,[name]:value})
    }
    const Login = async ()=>{
      if(Cookies.token)
      {
        return toast.info("already logged-In")
      }
        try{
            const response = await axios.post("http://localhost:5000/User/Login",login)
            setCookie("token",response.data.token)
            localStorage.setItem("userID",response.data.userID)
            localStorage.setItem("profile",response.data.filename)
  toast.success(response.data.message,{
    transition:Flip
  })
  nav("/Home")

        }
catch(error)
{
    toast.error(error.response.data.message,{
      transition:Flip
    })
    console.log("error",error)
}
    }
  return (
    <>
  
    <div className='login-parent'>

  <div className='login-frm'>
  <label className='login-title'>User Login</label>
        <input
        type='text'
        name='email'
        placeholder='Email...'
        className='ip1'
        value={login.email}
        onChange={handleChange}
        />
        <input
        type='password'
        name='password'
        placeholder='Password...'
        className='ip1'
        value={login.password}
        onChange={handleChange}
        />
        <button className='login-bt' onClick={()=>{Login()}}>Login</button>
        <label className='note'>New user ? <Link className='lg-lk' to="/Userregister">Sign up</Link></label>
        </div>
    </div>
   
    </>
  )
}
