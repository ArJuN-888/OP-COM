import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, Flip } from 'react-toastify';
import { useCookies } from 'react-cookie';
import { saveAs } from 'file-saver';
import '../Styles/Req.css';

export default function Requests() {
  const [sellerdata, setsellerData] = useState([]);
  const [Cookies,] = useCookies(['admintoken']);

  const [reqURL] = useState('http://localhost:5000/uploads');

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
          data: { filename }, // Pass filename as part of the data object
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
  
  
  const downloadImage = (url, filename) => {
    axios({
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
        <div key={data._id}>
          <div>{data.userID}</div>
          <div>{data.username}</div>
          <div>{data.email}</div>
          <div>{data.category}</div>
          <div>{data.phno}</div>
          <div>{data.address}</div>
          <div>{data.description}</div>
          <div>
            <img className='im' src={`${reqURL}/${data.filename}`} alt='Seller Image' />
            <button onClick={() => downloadImage(`${reqURL}/${data.filename}`, data.filename)}>
              Download Image
            </button>
          </div>
          <div>
            <button onClick={() => Confirm(data._id,data.userID)}>Confirm_seller_Request</button>
            <button onClick={() => Clear(data._id,data.userID,data.filename)}>Clear</button>
          </div>
        </div>
      ))}
    </div>
  );
}
