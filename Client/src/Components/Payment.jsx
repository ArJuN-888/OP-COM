import React, { useState } from 'react'
import {Form,Row,Button, Col} from "react-bootstrap"
import { CiLock } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { toast, Flip } from "react-toastify";
export default function Payment() {
    const nav = useNavigate()
    const [pay,setPay] = useState({
        holder:"",
 cardno:"",
 dno:"",
 cvv:""

    })
const handleChange = (key,value) =>{
setPay({...pay,[key]:value})
}
const navback = () =>{
    nav("/Cart")
    toast.success("Successfully cancelled ", {
        transition: Flip,
      });
}
  return (
    <div className='parent-pay d-flex flex-wrap justify-content-center align-items-center fs-5 
     ' style={{
        paddingTop:"110px",
       
    }}>
        <div><img src='https://www.decolore.net/wp-content/uploads/2018/06/Modern-Payment-Method-Icons-Pack.jpg' style={{boxShadow:"0px 0px 0px 0px"}} width="691px"/></div>
     <div className='form-Container   p-3' style={{
        boxShadow:"0px 0px 0px 0px",
        backgroundColor:"rgb(0,0,0,0.03)",
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
            
             placeholder='Holder name'
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
   <div className='d-flex gap-2'>
 <Button className='d-flex gap-2' variant='primary mt-4' style={{borderRadius:"0.2rem",boxShadow:"0px 0px 5px 0px grey"}}><CiLock  className='fs-4'/> Proceed</Button>  
 <Button onClick={navback} className='d-flex gap-2' variant='danger mt-4' style={{borderRadius:"0.2rem",boxShadow:"0px 0px 5px 0px grey"}}> Cancel Payment</Button>    
 </div>
       </Form>
     </div>
   
    </div>
  )
}
