import React, { useState } from 'react'
import {Form,Row,Button, Col} from "react-bootstrap"
import { CiLock } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { toast, Flip } from "react-toastify";
import easyinvoice from "easyinvoice"
import axios from "axios"
import nolike from "./background/nolike.png"
export default function Payment() {
    const nav = useNavigate()
    const phoneregex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
    const [pay,setPay] = useState({
        holder:"",
 dno:"",
 date:"",
 cvv:"",
 daddress:"",
 zip:"",
 phno:""

    })
    console.log("jdhgfjgjgh",pay)
const handleChange = (key,value) =>{
setPay({...pay,[key]:value})
}
const navback = () =>{
    nav("/Cart")
    toast.success("Successfully cancelled ", {
        transition: Flip,
      });
}

const Proceed =  async () =>{
    if(!pay.holder || !pay.dno || !pay.date || !pay.cvv || !pay.daddress || !pay.zip || !pay.phno)
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
      if(pay.zip && pay.zip.length<6){
        return  toast.warn("Please provide a 6 digit valid  Zip code ", {
              transition: Flip,
              unique: true
            });
      }
    if(pay.phno && !pay.phno.match(phoneregex))
    {
      return toast.warn("Please provide a 10 digit valid phone number ", {
           transition: Flip,
           unique: true
         });
    }
  //invoice generation 
  var data = {
    "images": {
        "background": "",
        logo: "https://public.budgetinvoice.com/img/logo_en_original.png",
      },
      "sender": {
        "company": "Sample Corp",
        "address": "Sample Street 123",
        "zip": "1234 AB",
        "city": "Sampletown",
        "country": "Samplecountry"
      },
      "client": {
        "company": "Client Corp",
        "address": "Clientstreet 456",
        "zip": "4567 CD",
        "city": "Clientcity",
        "country": "Clientcountry"
      },
      "information": {
        "number": "2022.0001",
        "date": "1.1.2022",
        "due-date": "15.1.2022"
      },
      "products": [
        {
          "quantity": "2",
          "description": "Test1",
          "tax-rate": 6,
          "price": 33.87
        },
        {
          "quantity": "4",
          "description": "Test2",
          "tax-rate": 21,
          "price": 10.45
        }
      ],
      "bottom-notice": "Kindly pay your invoice within 15 days.",
      "settings": {
        "currency": "INR",
        "tax-notation": "vat",
        "margin-top": 50,
        "margin-right": 50,
        "margin-left": 50,
        "margin-bottom": 25
      }
    
};
console.log("Invoice Data:", data);
//Create your invoice! Easy!
const result = await easyinvoice.createInvoice(data);
console.log("result",result.pdf)
easyinvoice.print(result.pdf, {
  fileName: "invoice.pdf" // Specify a valid filename here
});
  
  
}


  return (
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
                value={pay.daddress}
                onChange={(e)=> {
              
                     handleChange("daddress",e.target.value)
                 
                }}
                />
            

         
            </Col>
        </Form.Group>
        <Form.Group as={Row}>
        <Form.Label   className='frmpay' column>
Zipcode
        </Form.Label>
            <Col sm="12" className='d-flex gap-2 '>

                <Form.Control
                required
             type='text'
             placeholder='000000'
                style={{
                    borderRadius:"0.2rem"
                }}
                value={pay.zip}
                onChange={(e)=> {
                 if(e.target.value.length >6)
                 {
                     e.target.value = e.target.value.slice(0,6)
                 }
                 else
                 {
                     handleChange("zip",e.target.value)
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
                value={pay.phno}
                onChange={(e)=> {
              
                     handleChange("phno",e.target.value)
                 
                }}
                />
            

         
            </Col>
        </Form.Group>
   <div className='d-flex gap-2'>
 <Button onClick={()=>{Proceed()}} className='d-flex gap-2'  variant='outline-success  mt-4' style={{borderRadius:"0.2rem",boxShadow:"0px 0px 5px 0px grey"}}><CiLock  className='fs-4'/> Proceed</Button>  
 <Button onClick={navback} className='d-flex gap-2' variant='outline-danger mt-4' style={{borderRadius:"0.2rem",boxShadow:"0px 0px 5px 0px grey"}}> Cancel Payment</Button>    
 </div>
       </Form>
       </div>
       </div>
    </div>
  )
}
