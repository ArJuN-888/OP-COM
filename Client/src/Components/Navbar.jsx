import "../Styles/Navbar.css";
import { useCookies } from "react-cookie";
import { FaUserCircle } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import axios from "axios";
import GetID from "./Hooks/GetId";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FaHome } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";
import Getprofile from "./Hooks/Getprofile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faHeartCircleBolt } from "@fortawesome/free-solid-svg-icons";
import { RiAdminFill } from "react-icons/ri";
import { toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Context from "./Context";
export default function Navbar() {
  const { profileImage, setProfileImage } = useContext(Context);
 const [category,setCategory] = useState("")
  // const id=GetID()
  const profile = Getprofile();
  const nav = useNavigate();
  const ref = useRef();
  const userID = GetID();
  const [Cookies, setCookie] = useCookies(["token"]);
  const [reqURL] = useState("http://localhost:5000/uploads");

  useEffect(() => {
    const prImg = localStorage.getItem("profile");
    setProfileImage(prImg);
  }, [profile]);

  const handleLog = () => {
    localStorage.removeItem("userID");
    setCookie("token", "");
    toast("Successfully logged-Out", {
      transition: Flip,
    });
    localStorage.removeItem("profile");
    setProfileImage("");
    setCategory("")
  };


  const Close = () => {
    ref.current.style.display = "none";
  };
  const Toggle = () => {
    ref.current.style.display = "block";
  };
  return (
    <div>
      <nav className="nav">
        <label className="lbl">op-com</label>
        {Cookies.token && <div className="search">
          <input className="input-search" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Search here..." />
          {category &&<Link
          to={`/Search/${category}`}
            className="magnify-btn"
           
          >
            <div className="sub-div">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="glass" />
            </div>
          </Link>}
        </div>}
        <ul className="ul mb-0 ">
          {Cookies.token ? (
            <>
              <li>
                <NavLink to="/" className="lk" activeclassname="active">
                  {/* <FaHome className="icon" /> */}Home
                </NavLink>
              </li>
              <li>
                <NavLink className="lk" to="/profile" activeclassname="active">
                  Profile
                </NavLink>
              </li>

              <li>
                <NavLink className="liked" to="/Liked" activeclassname="active">
                  <FontAwesomeIcon
                    icon={faHeartCircleBolt}
                    className="border-heart"
                  />
                </NavLink>
              </li>
              <li>
                <NavLink to="/Cart" className="lk" activeclassname="active">
                  {/* <FaCartPlus className="icon" /> */}Cart
                </NavLink>
              </li>
              <li>
                <Link
                  to="/userlogin"
                  onClick={() => {
                    handleLog();
                  }}
                >
                  <FaSignOutAlt className="icon-out" />
                </Link>
              </li>
            </>
          ) : (
            <>
            <li>
              <NavLink to="/Adminlogin" activeclassname="active"  className="lk">
                {/* <RiAdminFill className="icon" /> */}Admin
               
              </NavLink>
              </li>
              <li>
              <Link to="/userlogin" activeclassname="active" className="lk" >
                <FaSignInAlt className="icon" />
              </Link>
              </li>
            </>
          )}

          <li><div className="img-contains">
            {Cookies.token ? (
              <img
                className="images"
                src={`${reqURL}/${profileImage}`}
                alt="profile"
              />
            ) : (
              <div className="qs">
                <FaUserCircle className="ic" />
              </div>
            )}
          </div>
          </li>
        </ul>
        <div className="dropdown">
          <button
            onClick={() => {
              Toggle();
            }}
            className="bt"
          >
            <FontAwesomeIcon icon={faBars} className="bars" />
          </button>
          <div className="dropdown-content" ref={ref}>
            <ul className="u">
              <div className="img-container">
                {Cookies.token ? (
                  <img
                    className="images"
                    src={`${reqURL}/${profileImage}`}
                    alt="profile"
                  />
                ) : (
                  <div className="qs">
                    <FaUserCircle className="ic" />
                  </div>
                )}
              </div>
              {Cookies.token ? (
                <>
                  {" "}
                  <li className="n">
                    <NavLink className="l" to="/" activeclassname="active">
                      <FaHome className="icon" />
                    </NavLink>
                  </li>
                  <li className="n">
                    <NavLink
                      className="l"
                      to="/profile"
                      activeclassname="active"
                    >
                      <FaUserEdit className="icon" />
                    </NavLink>
                  </li>
                  <li className="n">
                    <NavLink className="l" to="/Liked" activeclassname="active">
                      <FontAwesomeIcon
                        icon={faHeartCircleBolt}
                        className="border-heart"
                      />
                    </NavLink>
                  </li>
                  <li className="n">
                    <NavLink className="l" to="/Cart" activeclassname="active">
                      <FaCartPlus className="icon" />
                    </NavLink>
                  </li>
                  <li className="n">
                    <NavLink
                      className="l"
                      to="/userlogin"
                      onClick={() => {
                        handleLog();
                      }}
                    >
                      <FaSignOutAlt className="icon" />
                    </NavLink>
                  </li>{" "}
                  <li>
                    <button
                      className="cls-btn"
                      onClick={() => {
                        Close();
                      }}
                    >
                      <IoCloseOutline className="cross" />
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="n">
                    <NavLink className="l" to="/userlogin">
                      <FaSignInAlt className="icon" />
                    </NavLink>
                  </li>
                  <li className="n">
                    <NavLink className="l" to="/Adminlogin">
                      <RiAdminFill activeclassname="active" className="icon" />
                    </NavLink>
                  </li>
                  <li>
                    <button
                      className="cls-btn"
                      onClick={() => {
                        Close();
                      }}
                    >
                      <IoCloseOutline className="icon" />
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
