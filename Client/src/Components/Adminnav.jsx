import React from 'react'
import {Link} from "react-router-dom"
import "../Styles/Adminnav.css"
import {FaSignOutAlt} from "react-icons/fa";
import {  toast,Flip} from 'react-toastify';
import { useCookies } from "react-cookie";
import {FaHome} from "react-icons/fa";
export default function Adminnav() {
  const [Cookies,setCookie] = useCookies(["admintoken"]);
 
  const Logout = () =>{
  
      localStorage.removeItem("adminID")
      setCookie("admintoken","")
      
      toast.success("Successfully logged-Out", {
        transition: Flip
      });
     
 
 

  }
  return (
    <div>
      <nav className='parent-nav'>
        <ul className='uls mb-0'>
        <li> <Link to="/Adminhome" className='ad-link'><FaHome className='icons'/></Link></li>
        <li> <Link to="/Usermanagement" className='ad-link'>User-management</Link></li>
        <li> <Link to="/Add" className='ad-link'>Add-product</Link></li>
        <li> <Link to="/Requests" className='ad-link'>Requests</Link></li>
        <li><Link to = "Editproduct" className='ad-link'>Edit-product</Link></li>
        <li> <Link className='adm-stat' to="/Adminlogin"  onClick={()=>{Logout()}}><FaSignOutAlt className='icons'/></Link></li>
        </ul>
      </nav>
    </div>
  )
}
