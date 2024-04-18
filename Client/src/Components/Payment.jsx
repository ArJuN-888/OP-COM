import React, { useEffect, useState } from 'react'
import {Form,Row,Button, Col} from "react-bootstrap"
import { CiLock } from "react-icons/ci";
import { useNavigate,Link } from 'react-router-dom';
import { toast, Flip } from "react-toastify";
import axios from "axios"
import { useCookies } from "react-cookie";
import { useParams } from 'react-router-dom';
import GetID from './Hooks/GetId';
// import nolike from "./background/nolike.png"
export default function Payment() {
  useEffect(()=>{
    fetchpaypro();
    fetchtargetseller();
    fetchallusers();
  },[])
    const nav = useNavigate()
    const {id} = useParams()
    const userID = GetID()
    const [tog1,setTog1] = useState(false)
    const [tog2,setTog2] = useState(false)
    const [paypro,setPaypro] = useState([])
    const [seller,setSeller] = useState([])
    const [currentuser,setCurrentuser] = useState([])
    const [Cookies] = useCookies(["token"]);
    const [pro,setPro] = useState([])
    console.log("IDjhjjg",id)
    console.log("paypro",paypro)
    console.log("seller", seller)
    console.log("currentuser",currentuser)
  
    const phoneregex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
    const [pay,setPay] = useState({
        holder:"",
 dno:"",
 date:"",
 cvv:"",

    })
    //fetch product to be payed
const fetchpaypro = async() =>{
  const response = await axios.get(`http://localhost:5000/User/Cart/items/${userID}`,{
    headers:{
      Authorization:`${Cookies.token}`
    }
  }) 

    const filtertobepayed = response.data.cart.filter(element=>element.productID._id === id)
    // console.log("filteredpay",filtertobepayed)
   
  if(filtertobepayed.length!==0)
  {
    setPaypro(filtertobepayed)
   } 
  else{
    const response = await axios.get(`http://localhost:5000/Product/getProduct/idforstat/${userID}`,{
      headers:{
        Authorization:`${Cookies.token}`
      }
    }) 
    console.log("allpro",response.data.products)
    const filterproduct = response.data.products.filter(element=>element._id === id)
    // console.log("filteredpay",filtertobepayed)
    setPro(filterproduct)
   }

}
//fetching target seller
const fetchtargetseller = async()=>{
  const response = await axios.get(`http://localhost:5000/User/sellerRegistration/uniqueseller/${id}`,{
    headers:{
      Authorization:`${Cookies.token}`
    }
  }) 
  console.log("resposeseller",response.data)
  setSeller(response.data)
  setBillobj((prev) => ({
    ...prev,
    sellerphno: response.data[0].phno,
    sellercompany: response.data[0].description,
    selleraddress: response.data[0].address,
    selleremail: response.data[0].email,
    sellername: response.data[0].username,
}));
}
const fetchallusers = async() =>{
  const response = await axios.get("http://localhost:5000/User/UserRegistration/getall",{
    headers:{
      Authorization:`${Cookies.token}`
    }
  }) 
  const filteruserbyid = response.data.filter(element=>element._id === userID)
  setCurrentuser(filteruserbyid)
  setBillobj((prev) => ({
    ...prev,
    clientname: filteruserbyid[0].username,
    clientemail: filteruserbyid[0].email,
}));
}
    const [billObj,setBillobj] = useState({
      clientname:"",
      sellername:"",
      selleremail:"",
      clientemail:"",
      selleraddress:"",
      clientaddress:"",
      sellerphno:"",
      clientphno:"",
      sellercompany:"",
      productid:id,
      cpincode:""
    })
    console.log("billobj",billObj)
    console.log("jdhgfjgjgh",pay)
const handleChange = (key,value) =>{
setPay({...pay,[key]:value})
}
const handleChange1 = (key,value) =>{
  setBillobj({...billObj,[key]:value})
  }
const navback = () =>{
    nav("/Cart")
    toast.success("Successfully cancelled ", {
        transition: Flip,
      });
}

const Proceed =  async () =>{
    if(!pay.holder && !pay.dno && !pay.date && !pay.cvv)
    {
      return  toast.warn("All Specified fields are mandatory", {
            transition: Flip,
            unique: true
          });
    }
    if(pay.dno && pay.dno.length<16){
        return  toast.warn("Please provide a 16 digit valid Debit card number ", {
              transition: Flip,
              unique: true
            });
      }
    if(pay.cvv && pay.cvv.length<3){
        return  toast.warn("Please provide a 3 digit valid  cvv ", {
              transition: Flip,
              unique: true
            });
      }
      if(pay.cpincode && pay.cpincode.length<6){
        return  toast.warn("Please provide a 6 digit valid  cpincode code ", {
              transition: Flip,
              unique: true
            });
      }
    if(pay.clientphno && !pay.clientphno.match(phoneregex))
    {
      return toast.warn("Please provide a 10 digit valid phone number ", {
           transition: Flip,
           unique: true
         });
    }
try{
  const response = await axios.post("http://localhost:5000/Bill/Billregistration",billObj,{
    headers:{
      Authorization:`${Cookies.token}`
    }
  })
  const resp = await axios.put(`http://localhost:5000/User/Cart/remove/${userID}`,{id},{
    headers:{
      Authorization:`${Cookies.token}`
    }
  })
  toast.success(response.data.message, {
    transition: Flip,
  });
 
    setTog1(true)
}
catch(error)
{
  console.log(error)
}

  
}


  return (
    <>
    {tog1 === true ? <div className='pt-5 d-grid justify-content-center align-items-center' ><h1 className='mt-5'>Purchase Completed</h1><p className='mt-2'>Reciept <Link>Tap to view</Link><Link to="/Home">Back to Home</Link></p></div> : 
    <div className='parent-pay d-flex flex-wrap justify-content-center align-items-center fs-5 
     ' style={{
        paddingTop:"100px",
       
    }}>
        <div className='img-c'><img src='https://img.freepik.com/free-vector/cash-payment-concept-illustration_114360-3320.jpg?t=st=1713280820~exp=1713284420~hmac=5d4f087fea02c737312e40039396648c0d311db3caa89742d4656af4052ad9f7&w=740' style={{boxShadow:"0px 0px 0px 0px"}} width="500px" className='payim'/></div>
     <div className='form-Container   p-3' style={{
        boxShadow:"0px 0px 0px 0px",
        borderRadius:"0px 20px 20px 0px"
        
        
    

     }} >
       
       <Form >
       <h3>Payment Information</h3>
        <Form.Group  as={Row}>
        <Form.Label   className='frmpay' column>
Name on card
        </Form.Label>
            <Col sm="12">
                <Form.Control
                required
              value={pay.holder}
             placeholder='Holder name'
             onChange={(e)=>handleChange("holder",e.target.value)}
                style={{
                    borderRadius:"0.2rem",
                 
                }}
                />

         
            </Col>
        </Form.Group>
        <Form.Group as={Row}>

        <Form.Label  className='frmpay' column>
Card number
        </Form.Label>
            <Col sm="12">
                <Form.Control
                required
                type='number'
                value={pay.dno}
               onChange={(e)=> {
                if(e.target.value.length >16)
                {
                    e.target.value = e.target.value.slice(0,16)
                }
                else
                {
                    handleChange("dno",e.target.value)
                }
               }}
                placeholder='0000-0000-0000-0000'
                style={{
                    borderRadius:"0.2rem"
                }}
                />

         
            </Col>
        </Form.Group>
        <Form.Group as={Row}>
        <Form.Label sm="6"  className='frmpay' column>
Expiration date
        </Form.Label>
            <Col sm="7" className='d-flex gap-2 '>

                <Form.Control
                value={pay.date}
                onChange={(e)=>handleChange("date",e.target.value)}
                required
             type='month'
                style={{
                    borderRadius:"0.2rem"
                }}
                
                />
            

         
            </Col>
        </Form.Group>
        <Form.Group as={Row}>
        <Form.Label  className='frmpay' column>
CVV
        </Form.Label>
            <Col sm="12">
                <Form.Control
                type='number'
                required
                placeholder='000'
                 style={{
                    borderRadius:"0.2rem"
                }}
                value={pay.cvv}
                onChange={(e)=> {
                 if(e.target.value.length >3)
                 {
                     e.target.value = e.target.value.slice(0,3)
                 }
                 else
                 {
                     handleChange("cvv",e.target.value)
                 }
                }}
                
                />

         
            </Col>
        </Form.Group>

       </Form>
 
     </div>
     <div className='d-flex  flex-wrap justify-content-center' style={{marginTop:"130px",marginBottom:"10px",gap:"80px"}}>
     <div className='img-c'><img src='https://img.freepik.com/premium-vector/courier-deliver-goods-using-online-map-illustration_80802-1365.jpg?w=740' style={{boxShadow:"0px 0px 0px 0px"}} width="500px" className='payim'/></div>
     <div className='form-Container   p-3' style={{
        boxShadow:"0px 0px 0px 0px",
        borderRadius:"0px 20px 20px 0px"
        
        
    

     }} >
     <Form>
        <h3 style={{letterSpacing:"4px"}}>Shipping information </h3>
       <Form.Group as={Row}>
        <Form.Label   className='frmpay' column>
Delivery address
        </Form.Label>
            <Col sm="12" className='d-flex gap-2 '>

                <Form.Control
                required
             type='text'
             placeholder='Current address'
                style={{
                    borderRadius:"0.2rem"
                }}
                value={billObj.clientaddress}
                onChange={(e)=> {
              
                     handleChange1("clientaddress",e.target.value)
                 
                }}
                />
            

         
            </Col>
        </Form.Group>
        <Form.Group as={Row}>
        <Form.Label   className='frmpay' column>
Pincode
        </Form.Label>
            <Col sm="12" className='d-flex gap-2 '>

                <Form.Control
                required
             type='text'
             placeholder='000000'
                style={{
                    borderRadius:"0.2rem"
                }}
                value={billObj.cpincode}
                onChange={(e)=> {
                 if(e.target.value.length >6)
                 {
                     e.target.value = e.target.value.slice(0,6)
                 }
                 else
                 {
                     handleChange1("cpincode",e.target.value)
                 }
                }}
                
                />
            

         
            </Col>
        </Form.Group>
        <Form.Group as={Row}>
        <Form.Label   className='frmpay' column>
Phone no
        </Form.Label>
            <Col sm="12" className='d-flex gap-2 '>

                <Form.Control
                required
             type='text'
             placeholder='Phone no'
                style={{
                    borderRadius:"0.2rem"
                }}
                value={billObj.clientphno}
                onChange={(e)=> {
              
                     handleChange1("clientphno",e.target.value)
                 
                }}
                />
            

         
            </Col>
        </Form.Group>
   <div className='d-flex gap-2'>
 <Button onClick={()=>{Proceed()}} className='d-flex gap-2'  variant='outline-success  mt-4' style={{borderRadius:"0.2rem",boxShadow:"0px 0px 5px 0px grey"}}><CiLock  className='fs-4'/><b className='fs-6'>₹ {paypro&&paypro[0]?.productID.price || pro[0]?.price }</b> Proceed</Button>  
 <Button onClick={navback} className='d-flex gap-2' variant='outline-danger mt-4' style={{borderRadius:"0.2rem",boxShadow:"0px 0px 5px 0px grey"}}> Cancel Payment</Button>    
 </div>
       </Form>
       </div>
       </div>
    </div>
}
    </>
  )
}
