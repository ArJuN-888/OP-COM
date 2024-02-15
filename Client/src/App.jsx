import Profile from "./Components/Profile";
import Navbar from "./Components/Navbar";
import Context from "./Components/Context";
import GetadminID from "./Components/Hooks/GetadminID";
import GetID from "./Components/Hooks/GetId";
import "@fortawesome/fontawesome-free/css/all.css";
// import Adminpanel from './Components/Adminpanel';
import Cart from "./Components/Cart";
import Editproduct from "./Components/Editproduct";
import Requests from "./Components/Requests";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Userregistration from "./Components/Userregistration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Details from "./Components/Details";
import Sellerform from "./Components/Sellerform";
import "bootstrap/dist/css/bootstrap.min.css";
import Usermanagement from "./Components/Usermanagement";
import { useCookies } from "react-cookie";
import Adminnav from "./Components/Adminnav";
import Addproduct from "./Components/Addproduct";
import Adminlogin from "./Components/Adminlogin";
import Userlogin from "./Components/Userlogin";
import Adminhome from "./Components/Adminhome";
import Home from "./Components/Home";
import Searchresult from "./Components/Searchresult";
import Liked from "./Components/Liked";
function App() {
  const [userRegister, setuserRegister] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [Cookies] = useCookies(["admintoken"]);
  const [cookies,] = useCookies(["token"]);
  const userID = GetID();
  const [profileImage, setProfileImage] = useState("");
  const [status, setstatus] = useState(false);
  const Data = {
    userRegister,
    setuserRegister,
    status,
    setstatus,
    profileImage,
    setProfileImage,
  };
  const customToastStyle = {
    fontSize: '16px',
    letterSpacing:'2px',
    // Adjust the font size as needed
  };
  return (
    <>
      <BrowserRouter>
        <Context.Provider value={Data}>
          {Cookies.admintoken ? <Adminnav /> : <Navbar />}

          <Routes>
            <Route path="/Liked" element={<Liked />} />
            {Cookies.admintoken ? <><Route path="/Add" element={<Addproduct />} />
            <Route path="/Usermanagement" element={<Usermanagement />} />
            <Route path="/Requests" element={<Requests />} />
            <Route path="/Adminhome" element={<Adminhome />} />
            <Route path="/Editproduct" element={<Editproduct />} /></>:<></>}
           {cookies.token ? <> <Route path="/" element={<Home />} />
            <Route path="/Details/:productId" element={<Details />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Search/:category" element={<Searchresult />}/>
            <Route path="/Sellerform" element={<Sellerform />} />
            <Route path="/profile" element={<Profile />} /></>:<></>}
            {!userID &&  <Route path="/Adminlogin" element={<Adminlogin />} />}
           
           
          {!userID &&  <Route path="/userlogin" element={<Userlogin />} />}
            <Route path="/userregister" element={<Userregistration />} />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
      <ToastContainer
       position="top-center"
       style={customToastStyle}
       />
    </>
  );
}

export default App;
