import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../Styles/Reports.css"
import { useCookies } from 'react-cookie';
export default function Reports() {
  const [reports,setReports] = useState([])
  const [Cookies,] = useCookies(["admintoken"]);
  const [reqURL,] = useState("http://localhost:5000/uploads");

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
  return (
    <div className="Admin-report-parent">
      {reports.map((repo)=>(
<div key={repo._id} className='Admin-report-child'>
<div className='id-repo'>UID-{repo.userID}</div>

<div className='img-repo-container'><img className='repo-img' src={`${reqURL}/${repo.filename}`} /></div>
<div className='user-status-report'>
Role-{repo.sellerstatus===true ? "Seller":"user"}
</div>

   <div className='erepo-mail'>Email-{repo.email}</div>
   <div className='repo-name'>{repo.name}</div>
   <div className='repo-state'>{repo.reportstatement}</div>
   
  <div>{repo.dt}</div>
  <div><button>Resolve</button></div>
</div>

      )

      )}
    </div>
  )
}
