import React from 'react'
import "../Styles/Initial.css"
import { Link } from 'react-router-dom'
export default function Initial() {
  return (
    <div className='ini-parent'>
  
       <div> <label className='e-front'>"E-commerce is not just a transaction;it's an interaction. <br></br>  It's about building relationships with customers in the digital space."</label><br></br>
      <div className='l-div'> <Link to="/userregister" className='l-l'>Let's go</Link></div>
       </div>
     {/* <div><img  width="500px"  src="https://img.freepik.com/free-vector/flat-design-sale-background_23-2148936971.jpg?t=st=1715362286~exp=1715365886~hmac=f1e709c611cb95387adf71f4b188abb0c57ffb5d94a820b90db4c8c3a17892e4&w=996"/></div> */}
    </div>
  )
}
