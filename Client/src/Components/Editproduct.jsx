import React, { useEffect, useState } from 'react'
import '../Styles/Editproduct.css'
import {  toast,Flip} from 'react-toastify';
import axios from 'axios'
import { FaPen } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie'
import GetadminID from './Hooks/GetadminID';
import { IoSend } from 'react-icons/io5';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
export default function Editproduct() {
  const [price,setPrice] = useState("")
  const [disableCategorySelect, setDisableCategorySelect] = useState(false);
  const [stoke, setStoke] = useState("");
  const [category, setCategory] = useState("");
  const [brandname, setbrandname] = useState("");
  const [productname, setproductname] = useState("");
  const [description, setdescription] = useState("");
  const [photourl, setphotourl] = useState("");
  const [genderprefer,setGenderprefer] = useState("");
  const [strapcolor,setStrapcolor] = useState("");
  const [body,setBody] = useState("");
  const [material,setMaterial] = useState("");
  const [capacity,setCapacity] = useState("")
  const [edittoggle,setEdittoggle] = useState(0)
  const [ids,setids] = useState("")
    const [Cookies,] = useCookies(["admintoken"])
    const [adminproduct,setadminproduct] = useState([])
    console.log("adminproduct",adminproduct)
    const adminID = GetadminID()
    useEffect(()=>{
        fetchProducts()
    },[])
    const fetchProducts = async() =>{
        try{
            const response = await axios.get(`http://localhost:5000/Product/getProduct/adminproduct/${adminID}`,{
                headers:{
                    Authorization:`${Cookies.admintoken}`
                }
            })
            setadminproduct(response.data)
        }
    catch(error){
        toast.error(error.response.data.message,{
            transition: Flip
          })
    }
    }
    const deleteItem = async (id) => {
      try {
        const response = await axios.delete(
          `http://localhost:5000/Product/getProduct/deleteadminProduct/${id}`,
          {
            headers: {
              Authorization: `${Cookies.admintoken}`,
            },
          }
        );
        fetchProducts()
        toast.success(response.data.message, {
          transition: Flip,
        });
      } catch (error) {
        toast.error(error.response.data.message, {
          transition: Flip,
        });
      }
    };
    const editItem = (id) => {
      setDisableCategorySelect(true)
      setids(id)
      setEdittoggle(1)
      const filterdata = adminproduct.find((element) => element._id === id);
      console.log("filter", filterdata);
      setStoke(filterdata.stoke)
      setCategory(filterdata.category)
      setbrandname(filterdata.brandname)
      setproductname(filterdata.productname)
      setdescription(filterdata.description)
      setphotourl(filterdata.photourl)
      setPrice(filterdata.price)
      setGenderprefer(filterdata.genderprefer)
      setStrapcolor(filterdata.strapcolor)
      setBody(filterdata.body)
      setMaterial(filterdata.material)
      setCapacity(filterdata.capacity)
    };
    const updateProduct = async() =>{
      try{
        let payload = {
          stoke,
          category,
          brandname,
          productname,
          description,
          photourl,
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
        const response = await axios.put(`http://localhost:5000/Product/getProduct/updateadminproduct/${ids}`,
         payload,{
         
           headers: {
             Authorization: `${Cookies.admintoken}`,
           },
         
        })
        setEdittoggle(0)
        setStoke("")
        setphotourl("");
        setdescription("");
        setCategory("");
        setPrice("");
        setproductname("");
        fetchProducts()
      setbrandname("")
      setGenderprefer("")
        setStrapcolor("")
        setBody("")
        setMaterial("")
        setCapacity("")
        toast.success(response.data.message, {
          transition: Flip,
        });
      }
    catch(error){
      toast.error(error.response.data.message, {
        transition: Flip,
      });
    }
    }
    const updateCancel = () =>{
      setEdittoggle(0)
      setStoke("")
        setphotourl("");
        setdescription("");
        setCategory("");
        setPrice("");
        setproductname("");
        setbrandname("")
        setGenderprefer("")
        setStrapcolor("")
        setBody("")
        setMaterial("")
        setCapacity("")
    }
    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        By Clicking this ,you will permanently delete the item from your Collection
      </Tooltip>
    );
    const renderEdit  = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Edit Product
      </Tooltip>
    );
  return (
    <div className='Edit-parent'>
{adminproduct.map((product)=>(
<div key={product._id} className='home-childs'>
<div className='imgs-container'><img className='imgs' src={product.photourl} /></div>
<div className='pname'>{product.productname}</div>
<div className='pdis'>{product.description}</div>
<div className='pprice'>₹ {product.price}</div>
<div>
<OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderEdit}
    >
                  <button
                      className="Editp"
                      onClick={() => {
                        editItem(product._id);
                      }}
                    >
                      <FaPen/>
                    </button>
                    </OverlayTrigger>
                    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
                    <button
                      className="Delete"
                      onClick={() => {
                        deleteItem(product._id);
                      }}
                    >
                     <FontAwesomeIcon icon={faTimes}/>
                    </button>
                    </OverlayTrigger>
                  </div>
  </div>
))}
{edittoggle === 1 ?
 <>
 
 <div className="frm-child">
                <input
                  className="inputs"
                  placeholder="stoke..."
                  type="number"
                  value={stoke}
                  onChange={(e) => setStoke(e.target.value)}
                />
                        <select className="slt-ad" disabled={disableCategorySelect} value={category} onChange={(e)=>setCategory(e.target.value)}>
               <option className="op" value="" disabled>Select</option>
        <option className="op" value="watch">Watches</option>
        <option className="op" value="bag">Bags</option>
      </select>
                 <input
                  className="inputs"
                  placeholder="brandname..."
                  value={brandname}
                  onChange={(e) => setbrandname(e.target.value)}
                />
                <input
                  className="inputs"
                  placeholder="productname..."
                  value={productname}
                  onChange={(e) => setproductname(e.target.value)}
                />
                <input
                  className="inputs"
                  placeholder="description..."
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                />
                <input
                  className="inputs"
                  placeholder="photourl..."
                  value={photourl}
                  onChange={(e) => setphotourl(e.target.value)}
                />
                <input
                  className="inputs"
                  placeholder="Price..."
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                  <select       className="inputs"
        placeholder="Gender preference..."
        value={genderprefer}
        onChange={(e) => setGenderprefer(e.target.value)}>
 <option value="Gender">gender Preference</option>
 <option value="Male">Male</option>
 <option value="Female">Female</option>
 <option value="Universal">Universal</option>
     </select>
                {(category === "watch") ? <>
                <select      className="inputs"
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
              <select       className="inputs"
        placeholder="Body..."
        value={body}
        onChange={(e) => setBody(e.target.value)}>
 <option value="Body">Body</option>
 <option value="Steel">Steel</option>
 <option value="Rubber">Rubber</option>
 <option value="Plastic">Plastic</option>
 <option value="Carbon Fiber">Carbon Fiber</option>
     </select>
                </>:<>
                <select  className="inputs"
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
       <select   className="inputs"
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
      </select>
                </>}
               
             
                <div>  <button className="Req" onClick={updateProduct}>
                    Update <IoSend/>
                  </button>
                  <button className="passCancel" onClick={updateCancel}>
                    Cancel
                  </button></div>
                </div>
 
 </> 



: <></>}


    </div>
  )
}

      

