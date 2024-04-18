import Profile from "./Components/Profile";
import Navbar from "./Components/Navbar";
import "./app.css"
import Context from "./Components/Context";
import GetID from "./Components/Hooks/GetId";
import "@fortawesome/fontawesome-free/css/all.css";
import Reports from "./Components/Reports";
import Cart from "./Components/Cart";
// import Horizontalnavbar from "./Components/Horizontalnavbar";
import Editproduct from "./Components/Editproduct";
import Requests from "./Components/Requests";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Userregistration from "./Components/Userregistration";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Details from "./Components/Details";
import Sellerform from "./Components/Sellerform";
import Category1 from "./Components/Category1";
import Category2 from "./Components/Category2";
import "bootstrap/dist/css/bootstrap.min.css";
import Usermanagement from "./Components/Usermanagement";
import { useCookies } from "react-cookie";
import Adminnav from "./Components/Adminnav";

import Payment from "./Components/Payment";
import Addproduct from "./Components/Addproduct";
import Adminlogin from "./Components/Adminlogin";
import Userlogin from "./Components/Userlogin";
import Adminhome from "./Components/Adminhome";
import 'bootstrap/dist/css/bootstrap.min.css';
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
          {/* {cookies.token && (<Horizontalnavbar/>)} */}
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
            <Route path="/WatchCategory/:brandname" element={<Category1 />} />
            <Route path="/BagCategory/:brandname" element={<Category2/>}/>
            <Route path="/Payment/:id" element={<Payment />} />
            </>
            
            :<> <Route path="/" element={<Initial />} /></>}
            <Route path="/Adminlogin" element={<Adminlogin />} />
           
           
         <Route path="/userlogin" element={<Userlogin />} />
            <Route path="/userregister" element={<Userregistration />} />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
      <ToastContainer
       position="bottom-right"
       style={customToastStyle}
       autoClose={3000}
       theme="light"
       />
       {/* <footer>
       <div className="footer d-flex p-1 justify-content-center flex-wrap gap-3 mb-0  " style={{
        backgroundColor:"ButtonFace",
     
       }}>
       <div className="img"><img src="https://cdn-icons-png.flaticon.com/128/10829/10829119.png" width="40px" className="me-2" alt="image"/><label className="ft">opcomcounterpart23@gmail.com</label></div>
  <div className="img"><img src="https://cdn-icons-png.flaticon.com/128/2111/2111463.png" width="40px" alt="image"/></div>
  <div className="img"><img src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png" width="40px" alt="image"/></div>
  <div className="img"><img src="https://cdn-icons-png.flaticon.com/128/5969/5969020.png" width="40px" alt="image"/></div>
  <div className="img"><img src="https://cdn-icons-png.flaticon.com/128/2111/2111646.png" width="40px" alt="image"/></div>
       </div>
       </footer> */}
    </>
  );
}

export default App;
