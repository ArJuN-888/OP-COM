import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Flip } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { saveAs } from 'file-saver';
import '../Styles/Req.css';

export default function Requests() {
  const [sellerdata, setsellerData] = useState([]);
  const [Cookies,] = useCookies(['admintoken']);

  const [reqURL,] = useState('http://localhost:5000/uploads');

  useEffect(() => {
    fetchseller();
  }, []);

  const fetchseller = async () => {
    try {
      const response = await axios.get('http://localhost:5000/User/SellerRegistartion', {
        headers: {
          Authorization: `${Cookies.admintoken}`,
        },
      });
      setsellerData(response.data);
    } catch (error) {
      toast.error(error.response.data.message, {
        transition: Flip,
      });
    }
  };

  const Confirm = async (id,userID) => {
    try {
      const response = await axios.put(`http://localhost:5000/User/SellerRegistartion/Approves/${id}`, { pending:false,userID }, {
        headers: {
          Authorization: `${Cookies.admintoken}`,
        },
      });
      fetchseller();
      toast.success(`Seller request ${response.data.action}!`, {
        transition: Flip,
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        transition: Flip,
      });
    }
  };

  const Clear = async (id, userID, filename) => {
    try {

      const response = await axios.delete(
        `http://localhost:5000/User/SellerRegistartion/${id}`,
        {
          headers: {
            Authorization: `${Cookies.admintoken}`,
          },
          data: { filename,userID}, // Pass filename as part of the data object
        }
      );
      fetchseller();
  
      toast.success(response.data.message, {
        transition: Flip,
      });
      fetchseller()
      // First Axios request
      await axios.put(
        `http://localhost:5000/User/UserRegistration/${userID}`,
        { enotify: true },
        {
          headers: {
            Authorization: `${Cookies.admintoken}`,
          },
        }
      );
  
      // Second Axios request
     
  
      // Additional code after the Axios requests if needed
    
    } catch (error) {
      toast.error(error.response.data.message, {
        transition: Flip,
      });
    }
  };
  
  
  const downloadImage = async (url, filename) => {
    await axios({
      url,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      saveAs(new Blob([response.data]), filename);
    });
  };

  return (
    <div className='req-parent'>
      {sellerdata.map((data) => (
        <div key={data._id} className='req-child'>
          <div>
            <div className='req-image-contain'><img className='req-image' src={`${reqURL}/${data.filename}`} alt='Seller Image' /></div>
          <div className='btn-contain-dwld'> <button className='req-dwld-btn' onClick={() => downloadImage(`${reqURL}/${data.filename}`, data.filename)}>
              Download Image
            </button></div>
            </div>
          {/* <div className='req-id'>{data.userID}</div> */}
          <div className='data-part'>
          <div className='req-username'>Name: {data.username}</div>
          <div className='req-email'>Gmail: {data.email}</div>
          <div className='req-cat'>Category: {data.category}</div>
          <div className='req-phno'>Phno: {data.phno}</div>
          <div className='req-address'>Address: {data.address}</div>
          <div className='req-des'>Description: {data.description}</div>
    
          <div className='req-btn-grp'>
           <div> <button className='req-confirm-btn' onClick={() => Confirm(data._id,data.userID)}>Confirm_seller_Request</button></div>
           <div> <button className='req-clear-btn' onClick={() => Clear(data._id,data.userID,data.filename)}>Clear</button></div>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
}
