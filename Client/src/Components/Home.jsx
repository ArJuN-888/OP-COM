import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styles/Home.css";
import GetID from "./Hooks/GetId";
import { IoHeartSharp } from "react-icons/io5";
import Badge from "react-bootstrap/Badge";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import Stack from "react-bootstrap/Stack";
import { toast, Flip } from "react-toastify";
import { IoIosArrowForward } from "react-icons/io";
import caro from "./background/caro.png"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import caro1 from "./background/caro1.png"
import caro2 from "./background/caro2.png"
import caro3 from "./background/caro3.png"
import Carousel from 'react-bootstrap/Carousel';
import Accordion from 'react-bootstrap/Accordion';
import { IoSend } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { useCookies } from "react-cookie";
import { CgUser } from "react-icons/cg";
import { MdOutlineSell } from "react-icons/md";
export default function Home() {
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedCapacity, setSelectedCapacity] = useState(null);
  const [selectedstrapcolor, setSelectedstrapcolor] = useState(null);
  const [selectedbody, setSelectedbody] = useState(null);
  const [selectedgender1, setselectedGender1] = useState(null);
  const [selectedgender2, setselectedGender2] = useState(null);
  const [Liked, setLiked] = useState([]);
  const [filterbag, setfilterBag] = useState([]);
  const [filterwatch, setfilterwatch] = useState([]);
  const [Cookies] = useCookies(["token"]);
  const [allproducts, setallProducts] = useState([]);
  const [reportstatement, setReportstatement] = useState("");
  const [toggle, setToggle] = useState(0);
  //bag

  const [filtertog, setFiltertog] = useState(0);
  const [opmattog, setOpmattog] = useState(0);
  const [opcattog, setOpcattog] = useState(0);
  const [mctog, setmctog] = useState(0);
  //watch
  const [filtertogw, setFiltertogw] = useState(0);
  const [opstraptog, setOpstraptog] = useState(0);
  const [opbodytog, setOpbodytog] = useState(0);
  const [sbtog, setsbtog] = useState(0);
  //gender
  const [togglebag, settoggleBag] = useState(0);
  const [togglewatch, settoggleWatch] = useState(0);

  console.log("liked", Liked);
  console.log("capacity", selectedCapacity);
  console.log("material", selectedMaterial);
  console.log("body", selectedbody);
  console.log("color", selectedstrapcolor);
  const [dateandtime] = useState(new Date());
  const dt = dateandtime.toLocaleString();
  const userID = GetID();
  console.log("allproducts", allproducts);

  useEffect(() => {
    fetchProduct();
    fetchliked();
  }, []);
  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/Product/getProduct/idforstat/${userID}`,
        {
          headers: {
            Authorization: `${Cookies.token}`,
          },
        }
      );
      setallProducts(response.data.products);
      
    } catch (error) {
      toast(error.response.data.message, {
        transition: Flip,
      });
    }
 
  };
  const fetchliked = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/User/Liked/${userID}`,
        {
          headers: {
            Authorization: `${Cookies.token}`,
          },
        }
      );
      fetchProduct();
      setLiked(response.data.likedlist);
    } catch (error) {
      toast(error.response.data.message, {
        transition: Flip,
        toastId: "only one",
      });
    }
  };
  const checkLike = async (itemid) => {
    if (Liked.includes(itemid)) {
      try {
        const response = await axios.put(
          `http://localhost:5000/User/Liked/delete/${userID}`,
          { itemid },
          {
            headers: {
              Authorization: `${Cookies.token}`,
            },
          }
        );
        setFiltertog(0);
        setOpstraptog(0)
        setOpbodytog(0)
        setToggle(0)
        fetchProduct();
        toast.success(response.data.message, {
          transition: Flip,
        });
        fetchliked();
      } catch (error) {
        toast(error.response.data.message, {
          transition: Flip,
        });
      }
    } else {
      try {
        console.log("dsbfmdvmvf");
        const response = await axios.put(
          `http://localhost:5000/User/Liked/add/${userID}`,
          { itemid },
          {
            headers: {
              Authorization: `${Cookies.token}`,
            },
          }
        );
        setOpstraptog(0)
        setOpbodytog(0)
        setFiltertog(0);
        toast.success(response.data.message, {
          transition: Flip,
        });
        fetchliked();
      } catch (error) {
        toast(error.response.data.message, {
          transition: Flip,
        });
      }
    }
  };
  const ToggleInput = () => {
    setToggle(1);
  };
  const ToggleCancel = () => {
    console.log("hai");
    setToggle(0);
  };
  const Reportproceed = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/Report/reports",
        { userID: userID, reportstatement, dt },
        {
          headers: {
            Authorization: `${Cookies.token}`,
          },
        }
      );
      setToggle(0);
      setReportstatement("");
      toast.success(response.data.message, {
        transition: Flip,
      });
    } catch (error) {
      toast(error.response.data.message, {
        transition: Flip,
      });
    }
  };
  const hightoLow = () => {
    const data = [...allproducts];
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < data.length - 1; i++) {
        if (data[i].price < data[i + 1].price) {
          let temp = data[i];
          data[i] = data[i + 1];
          data[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
    setFiltertog(0);
    setFiltertogw(0);
    settoggleBag(0);
    settoggleWatch(0);
    setselectedGender1(null);
    setselectedGender2(null);
    setallProducts(data);
  };
  const lowtoHigh = () => {
    let swapped;
    const data = [...allproducts];
    do {
      swapped = false;
      for (let i = 0; i < data.length - 1; i++) {
        if (data[i].price > data[i + 1].price) {
          let temp = data[i];
          data[i] = data[i + 1];
          data[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
    setFiltertog(0);
    setFiltertogw(0);
    settoggleBag(0);
    settoggleWatch(0);
    setselectedGender1(null);
    setselectedGender2(null);
    setallProducts(data);
  };

  useEffect(() => {
    // Move the filtering logic here
    const filteredBags = allproducts.filter(
      (element) => element.category === "bag"
    );

    if (selectedMaterial) {
      setfilterBag(
        filteredBags.filter(
          (element) =>
            element.material.toLowerCase() === selectedMaterial.toLowerCase()
        )
      );
    } else if (selectedCapacity) {
      setfilterBag(
        filteredBags.filter(
          (element) => parseInt(element.capacity) === parseInt(selectedCapacity)
        )
      );
      console.log("filterbycap", filterbag);
    } else {
      // If no material is selected, just use the original filterbags
      setfilterBag(filteredBags);
    }
  }, [selectedMaterial, selectedCapacity, allproducts]);
  useEffect(() => {
    // Move the filtering logic here
    const filterwatches = allproducts.filter(
      (element) => element.category === "watch"
    );

    if (selectedstrapcolor) {
      setfilterwatch(
        filterwatches.filter(
          (element) =>
            element.strapcolor.toLowerCase() ===
            selectedstrapcolor.toLowerCase()
        )
      );
    } else if (selectedbody) {
      setfilterwatch(
        filterwatches.filter(
          (element) => element.body.toLowerCase() === selectedbody.toLowerCase()
        )
      );
      console.log("filterbycap", filterbag);
    } else {
      // If no material is selected, just use the original filterbags
      setfilterwatch(filterwatches);
    }
  }, [selectedbody, selectedstrapcolor, allproducts]);

  console.log("filterwatch", filterwatch);

  const handlefilterTog = () => {
    setFiltertog(1);
    settoggleBag(0);
    setselectedGender1(null);
  };

  // filterbags = filterbags.filter(element=>element.material === filterState)

  const handlemat = () => {
    setOpmattog(1);
    setmctog(1);
    setOpcattog(0);
  };
  const handlecap = () => {
    setOpcattog(1);
    setOpmattog(0);
    setmctog(1);
  };
  const Close = () => {
    setFiltertog(0);
    setmctog(0);
    setSelectedCapacity(null);
    setSelectedMaterial(null);
  };
  const handleMaterialChange = (material) => {
    setSelectedMaterial(material);
  };

  const handleCapacityChange = (capacity) => {
    setSelectedCapacity(capacity);
  };
  //watch filter
  const handlewatchfilterTog = () => {
    setFiltertogw(1);
    settoggleWatch(0);
    setselectedGender2(null);
  };
  const handlestrap = () => {
    setOpstraptog(1);
    setsbtog(1);
    setOpbodytog(0);
  };
  const handlebody = () => {
    setOpbodytog(1);
    setOpstraptog(0);
    setsbtog(1);
  };
  const Closew = () => {
    setFiltertogw(0);
    setsbtog(0);
    setSelectedstrapcolor(null);
    setSelectedbody(null);
  };
  const handlebodyChange = (body) => {
    setSelectedbody(body);
  };
  const handlestrapChange = (color) => {
    setSelectedstrapcolor(color);
  };
  const Idealforb = () => {
    settoggleBag(1);
    setFiltertog(0);
    setmctog(0);
    setSelectedCapacity(null);
    setSelectedMaterial(null);
  };
  const Idealforw = () => {
    settoggleWatch(1);
    setFiltertogw(0);
    setsbtog(0);
    setSelectedstrapcolor(null);
    setSelectedbody(null);
  };
  //gender
  const handlegb = (gender) => {
    setselectedGender1(gender);
  };

  const handlegw = (gender) => {
    setselectedGender2(gender);
  };
  useEffect(() => {
    const filterp = allproducts.filter((element) => element.category === "bag");
    if (selectedgender1) {
      setfilterBag(
        filterp.filter(
          (element) =>
            element.genderprefer.toLowerCase() === selectedgender1.toLowerCase()
        )
      );
    } else {
      setfilterBag(filterp);
    }
  }, [selectedgender1, allproducts]);
  useEffect(() => {
    const filterp = allproducts.filter(
      (element) => element.category === "watch"
    );
    if (selectedgender2) {
      setfilterwatch(
        filterp.filter(
          (element) =>
            element.genderprefer.toLowerCase() === selectedgender2.toLowerCase()
        )
      );
    } else {
      setfilterwatch(filterp);
    }
  }, [selectedgender2, allproducts]);
  const Close1 = () => {
    settoggleBag(0);
    setselectedGender1(null);
  };
  const Close2 = () => {
    settoggleWatch(0);
    setselectedGender2(null);
  };
  const uniquematerial = Array.from(new Set(filterbag.map(u => u.material)));
  const uniquecapacity = Array.from(new Set(filterbag.map(u => u.capacity)));
  const uniquebody = Array.from(new Set(filterwatch.map(u => u.body)));
  const uniquestrapcolor = Array.from(new Set(filterwatch.map(u => u.strapcolor)));
  console.log("FILLTERBAGS",filterbag,uniquematerial)
  return (
    <>

      {/* <div className='side-menu'>
      <ul className='side-ul'>
        <li className='side-li'><Link to="/Titan" className='side-lnk'><img src="https://logos-download.com/wp-content/uploads/2016/06/Titan_Watches_logo.png" width="110px"  /></Link></li>
        <li className='side-li'><Link to="/Casio" className='side-lnk'><img src="https://iconspng.com/images/casio-logo.jpg"  width="100px"/></Link></li>
        <li className='side-li-f'><Link to="/Fastrack" className='side-lnk'><img src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Fastrack_logo.png"  width="100px"/></Link></li>
        <li className='side-li'><Link to="/Sonata" className='side-lnk'><img src="https://vectorseek.com/wp-content/uploads/2023/08/Hyundai-Sonata-Logo-Vector.svg-.png" width="110px"/></Link></li>
      </ul>
      </div>   */}
    

      <div className="home-parent">
        
        <div className="sub-pr-parent">
        <div className="caro" >
     <Carousel fade >
      <Carousel.Item className="d-flex gap-3" >
   <img className="img-caro-2" src={caro1}/>

    {/* <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card> */}
      </Carousel.Item>
      <Carousel.Item>
        <img className="img-caro-2" src={caro2}/>

      </Carousel.Item>
      <Carousel.Item>
      <img className="img-caro" src={caro3}/>
      
      </Carousel.Item>
    </Carousel>
    </div>
          <div className="srt-parent-home">
            <Stack direction="horizontal" gap={2}className="stck">
              <Badge
                style={{
                  boxShadow: "0px 0px 2px 0px grey",
                  cursor: "pointer",
                }}
                onClick={hightoLow}
                bg="white"
              >
                <BsSortDown
                  style={{
                    fontSize: "25px",
                    color: "blue",
                  }}
                />
              </Badge>
              <Badge
                style={{
                  boxShadow: "0px 0px 2px 0px grey",
                  cursor: "pointer",
                }}
                onClick={lowtoHigh}
                bg="white"
              >
                <BsSortUp
                  style={{
                    fontSize: "25px",
                    color: "black",
                  }}
                />
              </Badge>
              {togglebag === 1 ? (
                <>
                  <input
                    value="Male"
                    checked={selectedgender1 === "Male"}
                    onChange={() => handlegb("Male")}
                    type="radio"
                  />
                  <label>Male</label>
                  <input
                    value="Female"
                    checked={selectedgender1 === "Female"}
                    onChange={() => handlegb("Female")}
                    type="radio"
                  />
                  <label>Female</label>
                  <input
                    value="Universal"
                    checked={selectedgender1 === "Universal"}
                    onChange={() => handlegb("Universal")}
                    type="radio"
                  />
                  <label>Universal</label>
                  <button
                    onClick={Close1}
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                  >
                    <IoIosClose
                      style={{
                        fontSize: "25px",
                        color: "grey",
                      }}
                    />
                  </button>
                </>
              ) : (
                <Badge
                  style={{
                    boxShadow: "0px 0px 2px 0px grey",
                    cursor: "pointer",
                  }}
                  onClick={Idealforb}
                  bg="white"
                >
                  <CgUser
                    style={{
                      fontSize: "25px",
                      color: "black",
                    }}
                  />
                </Badge>
              )}
              {filtertog === 1 ? (
                <>
                  {mctog === 1 ? (
                    <>
                      {opmattog === 1 && (
                        <>

                          {/* <input
                            value="leather"
                            checked={selectedMaterial === "leather"}
                            onChange={() => handleMaterialChange("leather")}
                            type="radio"
                          /> */}
                                                  {uniquematerial && uniquematerial.map((data,index)=>(
<>
<label>{data}</label>
                          <input
                         
                            checked={selectedMaterial === `${data}`}
                            onChange={() => handleMaterialChange(data)}
                            type="radio"
                          />
</>
                        ))}
                          {/* <label>Leather</label>
                          <input
                            value="Polyester"
                            checked={selectedMaterial === "polyester"}
                            onChange={() => handleMaterialChange("polyester")}
                            type="radio"
                          />
                          <label>Polyester</label> */}
                          <button
                            onClick={Close}
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                          >
                            <IoIosClose
                              style={{
                                fontSize: "25px",
                                color: "grey",
                              }}
                            />
                          </button>
                        </>
                      )}
                      {opcattog === 1 && (
                        <>
                        {uniquecapacity && uniquecapacity.map((data,index)=>(
                          <>
                        <label>{data}</label>
                        <input
                          checked={selectedCapacity === `${data}`}
                          onChange={() => handleCapacityChange(data)}
                          type="radio"
                        />
                        </>
                        ))}
                        
                        
                       
                          <button
                            onClick={Close}
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                          >
                            <IoIosClose
                              style={{
                                fontSize: "25px",
                                color: "grey",
                              }}
                            />
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {" "}
                      <button className="mt" onClick={handlemat}>
                        Material
                      </button>
                      <button className="cy" onClick={handlecap}>
                        Capacity
                      </button>
                    </>
                  )}
                </>
              ) : (
                <Badge
                  style={{
                    boxShadow: "0px 0px 2px 0px grey",
                    cursor: "pointer",
                    color: "black",
                    fontWeight: "500",
                    padding: "8.5px 10px",
                  }}
                  onClick={handlefilterTog}
                  bg="white"
                >
                  <IoIosArrowForward
                    style={{
                      fontSize: "18px",
                    }}
                  />
                </Badge>
              )}
              <label className="link-cat-parent">
                <Link to={`/BagCategory/Wildcraft`}>Wildcraft</Link>|
                <Link to={`/BagCategory/Puma`}>Puma</Link>|
                <Link to={`/BagCategory/Adidas`}>Adidas</Link>|
                <Link to={`/BagCategory/Wrogn`}>Wrogn</Link>|
              </label>
            </Stack>
          </div>
          <div className="bag-parent">
            {filterbag.map((product) => (
              <div key={product._id} className="home-child">
                <Link className="homelink" to={`/Details/${product._id}`}>
                  <button
                    onClick={(e) => {
                      checkLike(product._id);
                      e.preventDefault();
                    }}
                    className="like"
                  >
                    {Liked.includes(product._id) ? (
                      <IoHeartSharp className="likeicons" />
                    ) : (
                      <IoHeartSharp className="likeicon" />
                    )}
                  </button>
                  {/* <div className="prof-id">{product.loginid}</div> */}
                  <div className="imgs-container">
                    <img className="imgs" src={product.photourl} />
                  </div>
                  <div className="pnames ">
                    <label style={{ color: "black" }}>
                      {product.brandname}
                    </label>
                  </div>
                  <div className="pnam">{product.description}</div>
                  <div className="pprice">
                  <label><MdOutlineSell /> ₹ {product.price}{" "}</label>
                    {product.prevprice > product.price ? (
                      <div className="position-r">
                        {product.prevprice}
                        <label className="position-a"></label>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div>
        <img src="https://wildcraft.com/media/catalog/category/CB-1920x300-2.jpg" width="100%"/>
      </div>
          <div className="caro mt-5">
     <Carousel fade>
      <Carousel.Item>
   <img className="img-caro" src="https://www.sonatawatches.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-SonataSharedLibrary/default/dw9a40b6ca/images/homepage/desktop/NewArrivals-D.jpg"/>
      
      </Carousel.Item>
      <Carousel.Item>
        <img className="img-caro-2" src={caro}/>

      </Carousel.Item>
      <Carousel.Item>
      <img className="img-caro" src="https://www.sonatawatches.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-SonataSharedLibrary/default/dw8b64a755/images/homepage/desktop/Hum-Na-Rukenge-D.jpg"/>
      
      </Carousel.Item>
    </Carousel>
    </div>
          <div className="srt-parent-home">
            <Stack direction="horizontal" gap={2}>
              {togglewatch === 1 ? (
                <>
                  <input
                    value="Male"
                    checked={selectedgender2 === "Male"}
                    onChange={() => handlegw("Male")}
                    type="radio"
                  />
                  <label>Male</label>
                  <input
                    value="Female"
                    checked={selectedgender2 === "Female"}
                    onChange={() => handlegw("Female")}
                    type="radio"
                  />
                  <label>Female</label>
                  <input
                    value="Universal"
                    checked={selectedgender2 === "Universal"}
                    onChange={() => handlegw("Universal")}
                    type="radio"
                  />
                  <label>Universal</label>
                  <button
                    onClick={Close2}
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                  >
                    <IoIosClose
                      style={{
                        fontSize: "25px",
                        color: "grey",
                      }}
                    />
                  </button>
                </>
              ) : (
                <Badge
                  style={{
                    boxShadow: "0px 0px 2px 0px grey",
                    cursor: "pointer",
                  }}
                  onClick={Idealforw}
                  bg="white"
                >
                  <CgUser
                    style={{
                      fontSize: "25px",
                      color: "black",
                    }}
                  />
                </Badge>
              )}
              {filtertogw === 1 ? (
                <>
                  {sbtog === 1 ? (
                    <>
                      {opstraptog === 1 && (
                        <>
                        {uniquestrapcolor && uniquestrapcolor.map((data,index)=>(
                          <>
                               <label>{data}</label>
                          <input
                          
                            checked={selectedstrapcolor === `${data}`}
                            onChange={() => handlestrapChange(data)}
                            type="radio"
                          />
                          </>

                        ))}
                     
                        
                      
                          <button
                            onClick={Closew}
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                          >
                            <IoIosClose
                              style={{
                                fontSize: "25px",
                                color: "grey",
                              }}
                            />
                          </button>
                        </>
                      )}
                      {opbodytog === 1 && (
                        <>
                        {uniquebody && uniquebody.map((data,index)=>(
                          <>
                           <label>{data}</label>
                             <input
                        
                            checked={selectedbody ===`${data}`}
                            onChange={() => handlebodyChange(data)}
                            type="radio"
                          />
                         
                          </>
                        ))}
                       
                       
                          <button
                            onClick={Closew}
                            style={{
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                          >
                            <IoIosClose
                              style={{
                                fontSize: "25px",
                                color: "grey",
                              }}
                            />
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {" "}
                      <button className="mt" onClick={handlestrap}>
                        Strapcolor
                      </button>
                      <button className="cy" onClick={handlebody}>
                        Body
                      </button>
                    </>
                  )}
                </>
              ) : (
                <Badge
                  style={{
                    boxShadow: "0px 0px 2px 0px grey",
                    cursor: "pointer",
                    color: "black",
                    fontWeight: "500",
                    padding: "8.5px 10px",
                  }}
                  onClick={handlewatchfilterTog}
                  bg="white"
                >
                  <IoIosArrowForward
                    style={{
                      fontSize: "18px",
                    }}
                  />
                </Badge>
              )}
              <label className="link-cat-parent">
                <Link to={`/WatchCategory/Casio`}>Casio</Link>|
                <Link to={`/WatchCategory/Sonata`}>Sonata</Link>|
                <Link to={`/WatchCategory/Fastrack`}>Fastrack</Link>|
                <Link to={`/WatchCategory/Titan`}>Titan</Link>|
              </label>
            </Stack>
          </div>
          <div className="watch-parent">
            {filterwatch.map((product) => (
              <div key={product._id} className="home-child">
                <Link className="homelink" to={`/Details/${product._id}`}>
                  <button
                    onClick={(e) => {
                      checkLike(product._id);
                      e.preventDefault();
                    }}
                    className="like"
                  >
                    {Liked.includes(product._id) ? (
                      <IoHeartSharp className="likeicons" />
                    ) : (
                      <IoHeartSharp className="likeicon" />
                    )}
                  </button>
                  {/* <div className="prof-id">{product.loginid}</div> */}
                  <div className="imgs-container">
                    <img className="imgs" src={product.photourl} />
                  </div>
                  <div className="pnames ">
                    <label style={{ color: "black" }}>
                      {product.brandname}
                    </label>
                  </div>
                  <div className="pnam">{product.description}</div>
                  <div className="pprice">
                  <label><MdOutlineSell /> ₹ {product.price}{" "}</label>
                    {product.prevprice > product.price ? (
                      <div className="position-r">
                        {product.prevprice}
                        <label className="position-a"></label>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Accordion className="custom-header" flush >
      <Accordion.Item eventKey="1">
        <Accordion.Header className="custom-header" ><label style={{
          fontSize:"20px",
          
      backgroundColor:"rgb(0,0,0,0.9)",
      color:"white",
      borderRadius:"3px",
          padding:"2px 10px",
          
        }}><marquee>Kindly Specify your comments/reports, please provide the id of  product if you have any Query regarding that item</marquee></label></Accordion.Header>
        <Accordion.Body className="custom-header border-none">
        <div className="report-parent">
              <label className="t"></label>
              <div className="report-child">
                {toggle === 1 ? (
                  <>
                    <input
                      value={reportstatement}
                      onChange={(e) => setReportstatement(e.target.value)}
                      className="input-report"
                      placeholder="Specify here... "
                    />
                    <button
                      className="report-btn-Proceed"
                      onClick={Reportproceed}
                    >
                      Send <IoSend />
                    </button>
                    <button
                      className="report-btn-cancel"
                      onClick={ToggleCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <div>
                    <button className="report-btn-invoke" onClick={ToggleInput}>
                      Comments/Reports
                    </button>
                  </div>
                )}
              </div>
            </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
            
     

    </>
  );
}
