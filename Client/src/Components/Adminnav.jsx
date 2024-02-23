import React from 'react'
import {NavLink} from "react-router-dom"
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
        <div  className='panel'>
        <label className='panel-title'>Administrative Console</label>
        </div>
        <ul className='uls mb-0'>
        <li> <NavLink to="/Adminhome" className='ad-link'><FaHome className='icons-admin'/></NavLink></li>
        <li> <NavLink to="/Usermanagement" className='ad-link'>User-management</NavLink></li>
        <li> <NavLink to="/Reports" className='ad-link'>Reports</NavLink></li>
        <li> <NavLink to="/Add" className='ad-link'>Add-product</NavLink></li>
        <li> <NavLink to="/Requests" className='ad-link'>Requests</NavLink></li>
        <li><NavLink to = "Editproduct" className='ad-link'>Edit-product</NavLink></li>
        <li> <NavLink className='adm-stat' to="/"  onClick={()=>{Logout()}}><FaSignOutAlt className='icons-admin'/></NavLink></li>
        </ul>
      </nav>
    </div>
  )
}
