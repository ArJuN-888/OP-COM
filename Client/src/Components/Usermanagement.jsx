import React, { useEffect, useState } from 'react'
import "../Styles/Usermanagement.css"
import axios from 'axios'
import {  toast,Flip} from 'react-toastify';
import { useCookies } from 'react-cookie'
export default function Usermanagement() {
    const [Users,setUsers] = useState([])
    const [Cookies,] = useCookies(["admintoken"]);
    // console.log("users",Users)
    useEffect(()=>{
fetchUsers()
    },[])
    const fetchUsers = async() =>{
        try{
            const response = await axios.get("http://localhost:5000/User/UserRegistration",{
                headers:{
                    Authorization:`${Cookies.admintoken}`
                }
            })
            setUsers(response.data)
        }
catch(error){
    console.log("error",error)
}
    }
    const handleRemove = async(userID) =>{
        try{
 const response = await axios.delete(`http://localhost:5000/User/UserRegistration/${userID}`,{
    headers:{
        Authorization:`${Cookies.admintoken}`
    }
 })
 fetchUsers()
 toast.success(response.data.message,{
    transition:Flip
  })
}
catch(error){
    toast.error(response.data.message,{
        transition:Flip
      })
}
    }
    const handleBan = async (userID,ban) =>{
try{
    if(ban===true)
    {
       const response =  await axios.put(`http://localhost:5000/User/UserRegistration/ban/${userID}`,{banned:false},{
            headers:{
                Authorization:`${Cookies.admintoken}`
            }
        })
        toast.success(response.data.message,{
            transition:Flip
          })
    }
    else{
        const response =  await axios.put(`http://localhost:5000/User/UserRegistration/ban/${userID}`,{banned:true},{
            headers:{
                Authorization:`${Cookies.admintoken}`
            }
        })
        toast.success(response.data.message,{
            transition:Flip
          })
    }
 
fetchUsers()

}
catch(error){
    toast.error(response.data.message,{
        transition:Flip
      })

}
    }
  return (
    <div className='userman-parent'>
        <table  className='tab'>
            <thead>
                <tr>
                    <th>User_ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th colSpan="2">Action</th>
                </tr>
            </thead>
            <tbody>
{Users.map((user)=>(

        <tr key={user._id}>
        <td>{user._id}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td> 
           
       <button className='tb-bt' onClick={()=>{handleRemove(user._id)}}>Remove_Account</button>
       
        <button className='tb-btb' onClick={()=>{handleBan(user._id,user.banned )}}>{user.banned ? "un-ban":"ban"}</button>
        </td>
        
        </tr>
   
       
))}
</tbody>
</table>

    </div>
  )
}
