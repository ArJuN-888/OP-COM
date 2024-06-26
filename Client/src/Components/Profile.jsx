import React, { useContext, useEffect, useState } from "react";
import "../Styles/Profile.css";
import Context from "./Context";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { toast, Flip } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { IoSend } from 'react-icons/io5';
import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import Spinner from 'react-bootstrap/Spinner';
import Getprofile from "./Hooks/Getprofile";
import GetID from "./Hooks/GetId";
import Bill from "./Bill";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
export default function Profile() {
  const {
    userRegister,
    setuserRegister,
    status,
    setstatus,
    setProfileImage,
  } = useContext(Context);
  const [genderprefer,setGenderprefer] = useState("");
  const [strapcolor,setStrapcolor] = useState("");
  const [body,setBody] = useState("");
  const [material,setMaterial] = useState("");
  const [capacity,setCapacity] = useState("")
  const [stoke, setStoke] = useState("");
  const [category, setCategory] = useState("");
  const [brandname, setbrandname] = useState("");
  const [productname, setproductname] = useState("");
  const [description, setdescription] = useState("");
  const [photourl, setphotourl] = useState("");
  console.log("quantity", typeof quantity);
  console.log("stoke", typeof stoke);
  const userID = GetID();
  const profile = Getprofile();
  const [price, setPrice] = useState("");
  const [loginid,] = useState(userID)
  const [username, setusername] = useState("");
  const [sellerstat, setsellerstat] = useState(false);
  const [password, setPassword] = useState("");
  const [pmatch, setpmatch] = useState("");
  const [alluserproducts, setalluserProducts] = useState([]);
  const [selectedfile, setselectedFile] = useState(null);
  const [passactive, setpassactive] = useState(false);
  const [passtoggle, setPasstoggle] = useState(0);
  const [fetcheduser, setfetcheduser] = useState({});
  const [sellerdata, setsellerData] = useState([]);
  const [Cookies] = useCookies(["token"]);
  const [formtoggle, setFormtoggle] = useState(false);
  const [reqURL] = useState("http://localhost:5000/uploads");
  const [toggle, setToggle] = useState(0);
  const [edittoggle, setEdittoggle] = useState(false);
  const [ids, setids] = useState("");
  const [note, setnote] = useState(null);
  const [sellerreqstat,setsellerReqstat] = useState(null)
  const [estate, seteState] = useState(null);
  const [disableCategorySelect, setDisableCategorySelect] = useState(false);
  console.log("sfdmb", Cookies.token);
  console.log("email", fetcheduser.email);
  console.log("fetcheduser", fetcheduser);
  console.log("profile", profile);
  console.log("status", status);
  console.log("sfdmbdsgfhdhd", userID);
  console.log("loginuserproducts", alluserproducts);
  console.log("sellerdatapproved", sellerdata);
  console.log("enotify", estate);
  console.log("note", note);
  useEffect(() => {
    fetchUserprofile();
    fetchuserProduct();
    
  }, []);

  const notifyfetch = async () => {
    const response = await axios.get(
      `http://localhost:5000/User/SellerRegistartion/notify/${userID}`,
      {
        headers: {
          Authorization: `${Cookies.token}`,
        },
      }
    );
    setnote(response.data.notify);
    console.log("fetch successfull");
  };

  if (sellerstat === true && note === true) {
    const fetchsellerpendingstatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/User/SellerRegistartion/pendingstatus/${userID}`,
          {
            headers: {
              Authorization: `${Cookies.token}`,
            },
          }
        );

        setsellerData(response.data.seller);

        // Show toast only if pending status changes

        toast.success(response.data.message, {
          transition: Flip,
          toastId: "unique-toast-id",
        });
        await axios.put(
          `http://localhost:5000/User/SellerRegistartion/modify/${userID}`,
          { notify: false },
          {
            headers: {
              Authorization: `${Cookies.token}`,
            },
          }
        );
        notifyfetch();
      } catch (error) {
        toast.error(error.response.data.message, {
          transition: Flip,
        });
      }
    };
    fetchsellerpendingstatus();
  }
  const fetchuserProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/Product/getProduct/${userID}`,
        {
          headers: {
            Authorization: `${Cookies.token}`,
          },
        }
      );
      fetchUserprofile();
      setalluserProducts(response.data);
    } catch (error) {
      toast(error.response.data.message, {
        transition: Flip,
      });
    }
  };
  const fetchUserprofile = async () => {
    console.log("user id for fetching from profile", userID);
    try {
      const response = await axios.get(
        `http://localhost:5000/User/Login/profile/${userID}`,
        {
          headers: {
            Authorization: `${Cookies.token}`,
          },
        }
      );
      console.log("Response:", response);
      setfetcheduser(response.data.User);
      console.log("Fetched User:", response.data.User);
      setstatus(response.data.active);
      console.log("Status:", response.data.active);
      setusername(response.data.User.username);
    
      console.log("Username:", response.data.User.username);
      setsellerReqstat(response.data.req)
      console.log("reqstat",response.data.req)
      setsellerstat(response.data.sellerstatus);
      console.log("Seller Status:", response.data.sellerstatus);
      if (response.data.sellerstatus === true) {
        notifyfetch();
      }
      seteState(response.data.enotify);
      if (
        response.data.enotify === true &&
        response.data.sellerstatus === false
      ) {
        updateenotify();
      }

      console.log("Notification State:", response.data.enotify);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const updateenotify = async () => {
    toast.error("Your request to be a seller was denied by admin", {
      transition: Flip,
      toastId: "unique-toast-id",
    });
    await axios.put(
      `http://localhost:5000/User/UserRegistration/user/${userID}`,
      { enotify: false },
      {
        headers: {
          Authorization: `${Cookies.token}`,
        },
      }
    );

    fetchUserprofile();
  };

  const handleChange = (key, value) => {
    setuserRegister({ ...userRegister, [key]: value });
  };
  const handleEdit = () => {
    setToggle(1);
    setuserRegister({
      username: fetcheduser.username,
      email: fetcheduser.email,
    });
  };
  const HandleFile = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setselectedFile(file);

    try {
      const formData = new FormData();
      formData.append("image", file); // Use the correct field name

      const response = await axios.put(
        `http://localhost:5000/User/Login/Picture/${userID}`,
        formData,
        {
          headers: {
            Authorization: `${Cookies.token}`,
            "Content-Type": "multipart/form-data", // Add this header
          },
        }
      );

      localStorage.setItem("profile", response.data.user.filename);
      setProfileImage(response.data.user.filename);
      fetchUserprofile();
      toast(response.data.message, {
        transition: Flip,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const HandleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/User/Login/Update/${userID}`,
        userRegister,
        {
          headers: {
            Authorization: `${Cookies.token}`,
          },
        }
      );

      setPasstoggle(0);
      fetchUserprofile();
      toast.success(response.data.message, {
        transition: Flip,
      });
    } catch (error) {
      toast(error.response.data.message, {
        transition: Flip,
      });
      console.log("error", error);
    }
  };
  const HandleCancel = () => {
    setToggle(0);
    setPasstoggle(0);
  };
  const UpdatePass = () => {
    setPasstoggle(1);
  };
  const HandlepassCancel = () => {
    setPasstoggle(0);
    setPassword("");
  };
  const HandlepassReq = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/User/Login/passwordConfirm/${userID}`,
        { password },
        {
          headers: {
            Authorization: `${Cookies.token}`,
          },
        }
      );
      fetchUserprofile();
      toast(response.data.message, {
        transition: Flip,
      });
      setPassword("");

      setPasstoggle(0);
      setpassactive(response.data.Status);
    } catch (error) {
      toast.warn(error.response.data.message, {
        transition: Flip,
      });
    }
  };
  const Handlepasspost = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/User/Login/newpassword/${userID}`,
        { password, pmatch },
        {
          headers: {
            Authorization: `${Cookies.token}`,
          },
        }
      );
      fetchUserprofile();
      setpassactive(false);
      toast.success(response.data.message, {
        transition: Flip,
      });
      setPassword("");
    } catch (error) {
      toast.error(error.response.data.message, {
        transition: Flip,
      });
    }
  };
  const HandlepassActive = () => {
    setpassactive(false);
  };
  const handleAddProduct = () => {
    setFormtoggle(true);
    setDisableCategorySelect(false)
  };
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
      console.log("productadd",category)
      const response = await axios.post(
        "http://localhost:5000/Product/addProduct",
     payload,
        {
          headers: {
            Authorization: `${Cookies.token}`,
          },
        }
      );
      fetchuserProduct();
      setStoke("");
      setbrandname("");
      setphotourl("");
      setdescription("");
      setCategory("");
      setPrice("");
      setproductname("");
      toast(response.data.message, {
        transition: Flip,
      });
      setFormtoggle(false);
    } catch (error) {
      toast.error(error.response.data.message, {
        transition: Flip,
      });
    }
  };
  const addCancel = () => {
    setFormtoggle(false);
  };
  const deleteItem = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/Product/getProduct/deleteProduct/${id}`,
        {
          headers: {
            Authorization: `${Cookies.token}`,
          },
        }
      );
      fetchuserProduct();
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
    setids(id);
    setDisableCategorySelect(true)
    setEdittoggle(true);
    setFormtoggle(true);
    const filterdata = alluserproducts.find((element) => element._id === id);
    console.log("filter", filterdata);
    setStoke(filterdata.stoke);
    setbrandname(filterdata.brandname);
    setproductname(filterdata.productname);
    setCategory(filterdata.category)
    setdescription(filterdata.description);
    setphotourl(filterdata.photourl);
    setPrice(filterdata.price);
    setGenderprefer(filterdata.genderprefer)
    setStrapcolor(filterdata.strapcolor)
    setBody(filterdata.body)
    setMaterial(filterdata.material)
    setCapacity(filterdata.capacity)
  };
  const updateProduct = async () => {
    try {
      let payload = {
        stoke,
        category,
        brandname,
        productname,
        description,
        loginid,
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
      const response = await axios.put(
        `http://localhost:5000/Product/getProduct/${ids}`,
        payload,
      
        {
          headers: {
            Authorization: `${Cookies.token}`,
          },
        }
      );
      fetchuserProduct();
      setStoke("");
      setphotourl("");
      setbrandname("");
      setdescription("");
      setCategory("");
      setPrice("");
      setproductname("");
      setFormtoggle(false);
      setEdittoggle(false);
      toast.success(response.data.message, {
        transition: Flip,
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        transition: Flip,
      });
    }
  };
  const updateCancel = () => {
    setFormtoggle(false);
    setEdittoggle(false);
    setbrandname("");
    setStoke("");
    setphotourl("");
    setdescription("");
    setCategory("");
    setPrice("");
    setproductname("");
    setGenderprefer("")
        setStrapcolor("")
        setBody("")
        setMaterial("")
        setCapacity("")
  };
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
  const renderAdd = (props) => (
    <Tooltip id="button-tooltip" {...props}>
     Add Product
    </Tooltip>
  );
  const editProfile = (props) => (
    <Tooltip id="button-tooltip" {...props}>
     Edit Profile
    </Tooltip>
  );
  return (
    <>
    <div className="main">
      <div className="Parent">
        <div className="Childhold">
          <div className="stat">
            {sellerstat && <div className="statu">Seller</div>}
          </div>
          <div className="Child1">
            <div className="img-contain">
              <img className="image" src={`${reqURL}/${profile}`} />
              <div className="file-parent">
                <label className="lb">
                  <FaPlus className="pluss" />
                  <input type="file" className="file" onChange={HandleFile} />
                </label>
              </div>
            </div>

            <div className="id1">
              <div className="stat">
                {status && <div className="status">Active</div>}
              </div>

              {username}
            </div>
          </div>

          <div className="edit">
            {toggle ? (
              <div className="inp-class">
                <label className="inp-lbl">Username:</label>
                <input
                  className="inputs"
                  value={userRegister.username}
                  placeholder="username"
                  type="text"
                  onChange={(e) => handleChange("username", e.target.value)}
                />
                <label className="inp-lbl">Email:</label>
                <input
                  className="inputs"
                  value={userRegister.email}
                  placeholder="email"
                  type="text"
                  onChange={(e) => handleChange("email", e.target.value)}
                />

                <div className="btn-grp">
                  <Button variant=""
                  style={{letterSpacing:"3px"}}
                     color="inherit" onClick={() => HandleUpdate()}>
                    Update <IoSend className="ms-1" fontSize={28} style={{
                      padding:"0px 0px 2px 0px",

                    }}/>
                  </Button>
                  <Button variant=""
                  style={{letterSpacing:"3px"}}
                     color="primary" onClick={() => HandleCancel()}>
                    Cancel
                  </Button>
                  <Button variant=""
                     color="primary" onClick={() => UpdatePass()}>
                    <FaKey fontSize={28} />
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                   <OverlayTrigger
                                 placement="right"
                                 delay={{ show: 250, hide: 400 }}
                                 overlay={editProfile}
                               >
                <Button variant=""
                style={{letterSpacing:"3px"  }}
                     color="primary" onClick={() => handleEdit()}>
                  <FaPen fontSize={20} />
                </Button>
                </OverlayTrigger>
                {sellerstat && (
                                 <OverlayTrigger
                                 placement="right"
                                 delay={{ show: 250, hide: 400 }}
                                 overlay={renderAdd}
                               >
                  <Button variant=""
                  style={{letterSpacing:"3px"}}
                     color="primary" onClick={() => handleAddProduct()}>
                    <FaRegPlusSquare className="plus"  fontSize={25}/>
                  </Button>
                  </OverlayTrigger>
                )}
              </div>
            )}
          </div>
          <div className="passup-parent">
            {passtoggle ? (
              <div className="passup-child">
                <input
                  value={password}
                  className="inputs"
                  placeholder="Previous 🔑..."
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div>
                  <Button variant=""
                  style={{letterSpacing:"3px"}}
                     color="primary"onClick={() => HandlepassReq()}>
                    Request <IoSend style={{
                      padding:"0px 0px 2px 0px"
                    }}/>
                  </Button>
                  <Button
                    variant=""
                    style={{letterSpacing:"3px"}}
                    color="primary"
                    onClick={() => HandlepassCancel()}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <></>
            )}
            {passactive && (
              <div className="passup-child">
                <input
                  value={password}
                  className="inputs"
                  placeholder="New password..."
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  value={pmatch}
                  className="inputs"
                  placeholder="Confirm password..."
                  onChange={(e) => setpmatch(e.target.value)}
                />
                <div>
                  <Button variant=""
                  style={{letterSpacing:"3px"}}
                     color="primary" onClick={() => Handlepasspost()}>
                    Update <IoSend style={{
                      padding:"0px 0px 2px 0px"
                    }}/>
                  </Button>
                  <Button
                   variant=""
                   color="primary"
                   style={{letterSpacing:"3px"}}
                    onClick={() => HandlepassActive()}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="add-form">
            {formtoggle && (
              <div className="frm-child">
                <input
                  className="inputs"
                  placeholder="stoke..."
                  type="number"
                  value={stoke}
                  onChange={(e) => setStoke(e.target.value)}
                />
                  
         <select className="slt" value={category} disabled={disableCategorySelect} onChange={(e)=>setCategory(e.target.value)}>
         <option value="" disabled>Category</option>
        <option value="watch">Watches</option>
        <option value="bag">Bags</option>
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
      
      {category === "watch" && (<>    <select      className="inputs"
        placeholder="Strap color..."
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
     </select></>)}
       {category === "bag" && (  <> 
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
        <option></option>
      </select>
   </>)}
    
     
                {edittoggle ? (
                  <div>
                    {" "}
                    <Button variant=""
                    style={{letterSpacing:"3px"}}
                     color="primary" onClick={updateProduct}>
                      Update <IoSend style={{
                      padding:"0px 0px 2px 0px"
                    }}/>
                    </Button>
                    <Button variant=""
                    style={{letterSpacing:"3px"}}
                     color="primary" onClick={updateCancel}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="btn-add-grp">
                    <Button variant=""
                    style={{letterSpacing:"3px"}}
                     color="primary" onClick={addProduct}>
                      Create <IoSend style={{
                      padding:"0px 0px 2px 0px"
                    }}/>
                    </Button>
                    <Button variant=""
                    style={{letterSpacing:"3px"}}
                     color="primary" onClick={addCancel}>
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {alluserproducts.length !== 0 && (
          <div className="Child2">
            <p className="ad">Added-Products</p>
            <div className="overFlow">
              {alluserproducts.map((product) => (
                <div key={product._id} className="profile-map">
                  <div className="img-profile-container">
                    <img className="img-profile" src={product.photourl} />
                  </div>
                  <div>
                    {product.brandname}
                  </div>
                  <div>
                    <p className="ps">{product.productname}</p>
                  </div>

                  <div className="map-p-grp">
                  <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderEdit}
    >
                    <Button
                     variant=""
                     
                     style={{letterSpacing:"3px"}}
                      onClick={() => {
                        editItem(product._id);
                      }}
                    >
                      <FaPen fontSize={18} />
                    </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
       <Button
                     variant=""
                     style={{letterSpacing:"3px"}}
                     color="error"
                      onClick={() => {
                        deleteItem(product._id);
                      }}
                    >
                      <FontAwesomeIcon fontSize={22} icon={faTimes} />
                    </Button>
    </OverlayTrigger>
                 
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    
     
        {(sellerstat === false && sellerreqstat===true) && (<div className="seller-link">
        <Spinner animation="border" variant="black" /> Seller request Pending...
         </div>)}
         {(sellerstat === false && sellerreqstat===false) && (<div className="seller-link">
          Want to be a seller ?{" "}
          <Link className="seller-links" to="/Sellerform">
          Click here
          </Link>
         </div>)}
      
    </div>
    <Bill/>
    </>
  );
}
