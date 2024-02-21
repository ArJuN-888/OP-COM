import React, { useContext, useState } from 'react'
import Context from './Context'
import { Link } from 'react-router-dom';
import {  toast,Flip } from 'react-toastify';
import axios from "axios"
export default function Userregistration() {
  const {userRegister,setuserRegister} = useContext(Context)
  const [selectedfile,setselectedFile] = useState(null)
  const [filename,setFilename] = useState("")
  console.log("registered",userRegister)
  console.log("File",selectedfile)
  console.log("filename",filename)
  const handleChange = (key,value) =>{
   setuserRegister({...userRegister,[key]:value})
  }
  const HandleFile = (e) =>{
    setselectedFile(e.target.files[0])
    setFilename(e.target.files[0].name)
  }
  const HandleRegister = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedfile);//image key  specfies  multer field name that is also specified in the multer-config they should match
      console.log("formdata",formData)
      // Append other form fields to the formData
      Object.keys(userRegister).forEach((key) => {
        formData.append(key, userRegister[key]);
      
      });



 
  const response = await axios.post("http://localhost:5000/User/UserRegistration",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);
 setFilename("")
 toast(response.data.message,{
  transition:Flip
});
      setuserRegister({
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
      });

    } catch (error) {
      toast(error.response.data.message,{
        transition:Flip
      });
      console.log("error", error);
    }
  };

  return (
    <div className='login-parent'>
        <div className='login-frm'>
        <label className='login-title'>User Registration</label>
      <input
      value={userRegister.username}
      placeholder='username'
      type='text'
      className='ip1'
      onChange={(e)=>handleChange("username",e.target.value)}
      />
      <input
            value={userRegister.email}
          placeholder='email'
          type='text'
          className='ip1'
          onChange={(e)=>handleChange("email",e.target.value)}
      />
      <input
          value={userRegister.password}
          placeholder='password'
          type='text'
          className='ip1'
          onChange={(e)=>handleChange("password",e.target.value)}
      />
          <input
           value={userRegister.confirmpassword}
          placeholder='confirmpassword'
          type='text'
          className='ip1'
          onChange={(e)=>handleChange("confirmpassword",e.target.value)}
      />
      <div className='hover-grp'>
     <div><label className='hover'>
        Choose File
       
      <input
      type='file'
      onChange={HandleFile}
      className='ip1'
     />
     </label>
     </div> 
     <p className='nm'>{!filename ? "No file choosen": filename}</p>
     </div>
     <button className='login-bt' onClick={()=>{HandleRegister()}}>Register</button>
     <label className='note'>Existing user ? <Link className='lg-lk' to="/Userlogin">Login</Link></label>
    </div>
    </div>
  )
}
