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
  const [Cookies] = useCookies(["admintoken"]);
  const adminID = GetadminID()
  const [loginid,]=useState(adminID)
  const [price, setPrice] = useState("");
  const addProduct = async () => {
    try {
      const response = await axios.post('http://localhost:5000/Product/addProduct',{stoke,category,brandname,productname,description,photourl,loginid,price},{
        headers:{
          Authorization: `${Cookies.admintoken}`
        },
      });
      toast.success(response.data.message,{
        transition: Flip
      })
    } catch (error) {
      toast.error(error.response.data.message,{
        transition: Flip
      })
    }
  };
  return (
    <div className="prd-main">
      <input
        placeholder="stoke..."
        type="number"
        value={stoke}
        onChange={(e) => setStoke(e.target.value)}
      />
       <input
        placeholder="category..."
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        placeholder="brandname..."
        value={brandname}
        onChange={(e) => setbrandname(e.target.value)}
      />
      <input
        placeholder="productname..."
        value={productname}
        onChange={(e) => setproductname(e.target.value)}
      />
      <input
        placeholder="description..."
        value={description}
        onChange={(e) => setdescription(e.target.value)}
      />
      <input
        placeholder="photourl..."
        value={photourl}
        onChange={(e) => setphotourl(e.target.value)}
      />
       <input
        placeholder="Price..."
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={addProduct}>Add</button>
    </div>
  );
}
