import React from 'react'
import "../Styles/Initial.css"
import { Link } from 'react-router-dom'
export default function Initial() {
  return (
    <div className='ini-parent'>
       <div> <label className='e-front'>"E-commerce is not just a transaction;it's an interaction. <br></br>  It's about building relationships with customers in the digital space."</label><br></br>
      <div className='l-div'> <Link to="/userregister" className='l-l'>Let's go</Link></div>
       </div>
     
    </div>
  )
}
