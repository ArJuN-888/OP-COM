import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TfiTrash } from "react-icons/tfi";
import { IoCloseOutline } from "react-icons/io5";
import "../Styles/Reports.css"
import { CgDanger } from "react-icons/cg";
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
export default function Reports() {
  const [reports,setReports] = useState([])
  const [Cookies,] = useCookies(["admintoken"]);
  const [reqURL,] = useState("http://localhost:5000/uploads");
const [toggle,setToggle] = useState({})
    useEffect(()=>{
   fetchReports()
    },[])
    const fetchReports = async() =>{
     
        const response = await axios.get("http://localhost:5000/Report/reports/fetch",{
          headers:{
            Authorization:`${Cookies.admintoken}`
          }
        })
        setReports(response.data.reports)
  
    }
    const Showissue = (repoId) =>{
      setToggle(prevStates => ({ ...prevStates, [repoId]: 1 }));
    }
    const Closeissue = (repoId) =>{
      setToggle(prevStates => ({ ...prevStates, [repoId]: 0 }));
    }
    const Deleterepo = async(repoID) =>{
      try{
const response = await axios.delete(`http://localhost:5000/Report/reports/delete/${repoID}`,{
  headers:{
    Authorization:`${Cookies.admintoken}`
  }
})
fetchReports()
toast.success(response.data.message,{
  transition: Flip,
  toastId: "unique-toast-id",
})
      }
      catch(error){
        toast.error(error.response.data.message, {
          transition: Flip,
          toastId: "unique-toast-id",
        })
      }
    }
  return (
    <div className="Admin-report-parent">
      {reports.map((repo)=>(
<div key={repo._id} className='Admin-report-child'>

<div className='img-repo-container'><img className='repo-img' src={`${reqURL}/${repo.filename}`} /></div>
<div className='user-status-report'>
Role-{repo.sellerstatus===true ? "Seller":"user"}
</div>
||
   <div ><label className='repo-mail'>Email-{repo.email}</label></div>||
   {toggle[repo._id]=== 1 ?  <div className='repo-state'><label className='statement-rp'>{repo.reportstatement}</label><button onClick={()=>{Closeissue(repo._id)}} className='cls-repo'><IoCloseOutline/></button></div> 
   : 
   <div><button className='issue' onClick={()=>{Showissue(repo._id)}}><CgDanger className='is' /></button></div> } || 
  
  <div>{repo.dt}</div>||
<div className='text-danger'>Rated : {repo.rating}/5</div>
    <button onClick={()=>{Deleterepo(repo._id)}} className='rsl'><TfiTrash /></button>
  
 
</div>

      )

      )}
    </div>
  )
}
