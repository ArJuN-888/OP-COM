import React, { useContext, useState } from 'react'
import Context from './Context'
import {  toast,Flip } from 'react-toastify';
import axios from "axios"
export default function Userregistration() {
  const {userRegister,setuserRegister} = useContext(Context)
  const [selectedfile,setselectedFile] = useState(null)
  console.log("registered",userRegister)
  console.log("File",selectedfile)
  const handleChange = (key,value) =>{
   setuserRegister({...userRegister,[key]:value})
  }
  const HandleFile = (e) =>{
    setselectedFile(e.target.files[0])
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
      <input
      value={userRegister.username}
      placeholder='username'
      type='text'
      onChange={(e)=>handleChange("username",e.target.value)}
      />
      <input
            value={userRegister.email}
          placeholder='email'
          type='text'
          onChange={(e)=>handleChange("email",e.target.value)}
      />
      <input
          value={userRegister.password}
          placeholder='password'
          type='text'
          onChange={(e)=>handleChange("password",e.target.value)}
      />
          <input
           value={userRegister.confirmpassword}
          placeholder='confirmpassword'
          type='text'
          onChange={(e)=>handleChange("confirmpassword",e.target.value)}
      />
      <input
      type='file'
      onChange={HandleFile}
     />
     <button onClick={()=>{HandleRegister()}}>Register</button>
    </div>
  )
}
