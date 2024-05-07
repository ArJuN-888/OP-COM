import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import GetadminID from "./Hooks/GetadminID";
import {  toast,Flip} from 'react-toastify';
import "../Styles/Addproduct.css";
export default function Addproduct() {
  const [stoke,setStoke] = useState("");
  const [category,setCategory] = useState("")
  const [brandname,setbrandname] = useState("")
  const [productname, setproductname] = useState("");
  const [description, setdescription] = useState("");
  const [photourl, setphotourl] = useState("");
  const [genderprefer,setGenderprefer] = useState("");
  const [strapcolor,setStrapcolor] = useState("");
  const [body,setBody] = useState("");
  const [material,setMaterial] = useState("");
  const [capacity,setCapacity] = useState("")
  const [Cookies] = useCookies(["admintoken"]);
  const adminID = GetadminID()
  const [loginid,]=useState(adminID)
  const [price, setPrice] = useState("");
  const addProduct = async () => {
    try {
      let payload = {
        stoke,
        category,
        brandname,
        productname,
        description,
        photourl,
        loginid,
        price,
        genderprefer,
      };
  
      if (category === "watch") {
        payload = {
          ...payload,
          body,
          strapcolor,
        };
      }
      else if(category === "bag"){
        payload = {
          ...payload,
          material,
          capacity
         
        };
      }
  
      const response = await axios.post('http://localhost:5000/Product/admin/addProduct', payload, {
        headers: {
          Authorization: `${Cookies.admintoken}`
        },
      });
  setCapacity("")
  setCategory("")
  setGenderprefer("")
  setPrice("")
  setStoke("")
  setphotourl("")
  setproductname("")
  setbrandname("")
  setStrapcolor("")
  setBody("")
  setMaterial("")
      toast.success(response.data.message, {
        transition: Flip
      });
    } catch (error) {
      toast.error(error.response.data.message,{
        transition: Flip
      })
    }
  };
  return (
    <div className="prd-main">
      <div className="prd-sub">
      <input
        placeholder="stoke..."
        className="in"
        type="number"
        value={stoke}
        onChange={(e) => setStoke(e.target.value)}
      />
               <select className="slt-ad" value={category} onChange={(e)=>setCategory(e.target.value)}>
               <option className="op" value="" disabled>Select</option>
        <option className="op" value="watch">Watch</option>
        <option className="op" value="bag">Bag</option>
      </select>
      <input
        placeholder="brandname..."
        className="in"
        value={brandname}
        onChange={(e) => setbrandname(e.target.value)}
      />
      <input
       className="in"
        placeholder="productname..."
        value={productname}
        onChange={(e) => setproductname(e.target.value)}
      />
      <input
       className="in"
        placeholder="description..."
        value={description}
        onChange={(e) => setdescription(e.target.value)}
      />
      <input
       className="in"
        placeholder="photourl..."
        value={photourl}
        onChange={(e) => setphotourl(e.target.value)}
      />
       <input
        className="in"
        placeholder="Price..."
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
         <select       className="in"
        placeholder="Gender preference..."
        value={genderprefer}
        onChange={(e) => setGenderprefer(e.target.value)}>
 <option value="Gender">gender Preference</option>
 <option value="Male">Male</option>
 <option value="Female">Female</option>
 <option value="Universal">Universal</option>
     </select>
     
      {category === "watch" && (<> <select      className="in"
        placeholder="Strap Color..."
        value={strapcolor}
        onChange={(e) => setStrapcolor(e.target.value)}>
 <option value="Stap Color">Strap Color</option>
 <option value="Brown">Brown</option>
 <option value="Black">Black</option>
 <option value="White">White</option>
 <option value="Blue">Blue</option>
 <option value="Green">Green</option>
 <option value="Red">Red</option>
 <option value="Yellow">Orange</option>
 <option value="Grey">Grey</option>
 <option value="Beige">Biege</option>
 <option value="Silver">Silver</option>
 <option value="Gold">Gold</option>
     </select>
     <select       className="in"
        placeholder="Body..."
        value={body}
        onChange={(e) => setBody(e.target.value)}>
 <option value="Body">Body</option>
 <option value="Steel">Steel</option>
 <option value="Rubber">Rubber</option>
 <option value="Plastic">Plastic</option>
 <option value="Carbon Fiber">Carbon Fiber</option>
     </select></>)} 
      {category === "bag" && (<>  <select  className="in"
      placeholder="material..."
      value={material}
      onChange={(e) => setMaterial(e.target.value)}>
<option value="Materials">Materials</option>
<option value="Polyester">Polyester</option>
<option value="Nylon">Nylon</option>
<option value="Canvas">Canvas</option>
<option value="Leather">Leather</option>
<option value="Polyurethane">Polyurethane</option>
<option value="Vinyl">Vinyl</option>
<option value="Cotton">Cotton</option>
<option value="Denim">Denim</option>
<option value="Resin">Resin</option>
       </select>
       <select   className="in"
      placeholder="capacity..."
      value={capacity}
      onChange={(e) => setCapacity(e.target.value)}>
        <option value="">Capacity</option>
        <option value="5L">5L</option>
        <option value="10L" >10L</option>
        <option value="15L" >15L</option>
        <option value="20L" >20L</option>
        <option value="25L" >25L</option>
        <option value="30L" >30L</option>
        <option value="35L" >35L</option>
        <option value="40L" >40L</option>
        <option value="45L" >45L</option>
        <option value="50L" >50L</option>
      </select></>)}
     
     
  
      
      <button className="ad-bt-add" onClick={addProduct}>Create</button>
      </div>
    </div>
  );
}
