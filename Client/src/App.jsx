import Profile from "./Components/Profile";
import Navbar from "./Components/Navbar";
import "./app.css"
import Context from "./Components/Context";
import GetID from "./Components/Hooks/GetId";
import "@fortawesome/fontawesome-free/css/all.css";
import Reports from "./Components/Reports";
import Cart from "./Components/Cart";
import Fastrack from "./Components/Fastrack";
import Sonata from "./Components/Sonata";
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
import Casio from "./Components/Casio";
import Titan from "./Components/Titan";
import Addproduct from "./Components/Addproduct";
import Adminlogin from "./Components/Adminlogin";
import Userlogin from "./Components/Userlogin";
import Adminhome from "./Components/Adminhome";
import Home from "./Components/Home";
import Searchresult from "./Components/Searchresult";
import Liked from "./Components/Liked";
import Initial from "./Components/Initial";
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
         
            {Cookies.admintoken ? <><Route path="/Add" element={<Addproduct />} />
            <Route path="/Usermanagement" element={<Usermanagement />} />
            <Route path="/Requests" element={<Requests />} />
            <Route path="/Adminhome" element={<Adminhome />} />
            <Route path="/Editproduct" element={<Editproduct />} />
            <Route path="/Reports" element={<Reports />} />
            </>:<> <Route path="/" element={<Initial />} /></>}
           {cookies.token ? <> <Route path="/Home" element={<Home />} />
           <Route path="/Liked" element={<Liked />} />
            <Route path="/Details/:productId" element={<Details />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Search/:category" element={<Searchresult />}/>
            <Route path="/Sellerform" element={<Sellerform />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Fastrack" element={<Fastrack />} />
            <Route path="/Titan" element={<Titan />} />
            <Route path="/Casio" element={<Casio />} />
            <Route path="/Sonata" element={<Sonata />} />
            </>
            
            :<> <Route path="/" element={<Initial />} /></>}
            {!userID &&  <Route path="/Adminlogin" element={<Adminlogin />} />}
           
           
          {!userID &&  <Route path="/userlogin" element={<Userlogin />} />}
            <Route path="/userregister" element={<Userregistration />} />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
      <ToastContainer
       position="bottom-right"
       style={customToastStyle}
      //  toastStyle={{backgroundColor:"rgb(0,0,0,0.5"}}
       autoClose={3000}
       theme="light"
       />
    </>
  );
}

export default App;
