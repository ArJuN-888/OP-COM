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
       <input
        className="in"
        placeholder="Gender preference..."
        value={genderprefer}
        onChange={(e) => setGenderprefer(e.target.value)}
      />
     
      {category === "watch" && (<><input
        className="in"
        placeholder="Strap color..."
        value={strapcolor}
        onChange={(e) => setStrapcolor(e.target.value)}
      />
       <input
        className="in"
        placeholder="body..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      /></>)} 
      {category === "bag" && (<> <input
      className="in"
      placeholder="material..."
      value={material}
      onChange={(e) => setMaterial(e.target.value)}
    />
    <input
      className="in"
      placeholder="capacity..."
      value={capacity}
      onChange={(e) => setCapacity(e.target.value)}
    /></>)}
     
     
  
      
      <button className="ad-bt-add" onClick={addProduct}>Create</button>
      </div>
    </div>
  );
}
