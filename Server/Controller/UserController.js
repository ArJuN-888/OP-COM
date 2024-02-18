const { Users, Seller } = require("../Model/UserSchema");
const { Products } = require("../Model/ProductSchema");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { response } = require("express");
require("dotenv").config();
const mailformat =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passformat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
const txt = /.com/;
const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ message: "Please select a file" });
    }
    const user = await Users.findOne({ email });
    if (user) {
      const callback = () => {
        console.log("Removed profile due to invalid registration credentials");
      };
      fs.unlink(`public/uploads/${req.file.filename}`, callback);
      return res.status(400).json({ message: "User already exists" });
    }
    if (!username || !email || !password) {
      const callback = () => {
        console.log("Removed profile due to invalid registration credentials");
      };
      fs.unlink(`public/uploads/${req.file.filename}`, callback);
      return res.status(400).json({ message: "Fill the fields" });
    }
    if (!email.match(mailformat && txt)) {
      const callback = (error) => {
        console.log("Removed profile due to invalid registration credentials");
      };
      fs.unlink(`public/uploads/${req.file.filename}`, callback);
      return res.status(400).json({ message: "Enter a valid email" });
    }
    if (!password.match(passformat)) {
      const callback = () => {
        console.log("Removed profile due to invalid registration credentials");
      };
      fs.unlink(`public/uploads/${req.file.filename}`, callback);
      return res.status(400).json({
        message:
          " required : Minimum 8 characters,Maximum 20 characters,At least one uppercase character,At least one lowercase character,At least one digit,At least one special character ",
      });
    }

    if (password !== confirmpassword) {
      const callback = () => {
        console.log("Removed profile due to invalid registration credentials");
      };
      fs.unlink(`public/uploads/${req.file.filename}`, callback);
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const data = new Users({
      username,
      email,
      password: hashedpassword,
      filename: req.file.filename,
      sellerstatus: false,
      banned: false,
      enotify: false,
    });

    await data.save();

    res.status(200).json({ message: "Successfully registered", data });
  } catch (error) {
    console.log("error", error);

    // Check if response headers have already been sent
  }
};
const getUsers = async (req, res) => {
  const data = await Users.find({});
  res.status(200).send(data);
};
const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      return res.status(400).json({ message: "Fill the fields" });
    }
    const user = await Users.findOne({ email }).lean();
    if (!user) {
      return res.status(400).json({ message: "user doesnt exist" });
    }

    const passwordvalid = await bcrypt.compare(password, user.password);

    if (!passwordvalid) {
      return res.status(400).json({ message: "invalid password" });
    }
    const token = JWT.sign({ id: user._id }, process.env.SECRET);
    if (user.banned === true) {
      return res.status(400).json({
        message:
          "your account has been banned due to by means of privacy violations",
      });
    }
    res.status(200).json({
        token: token,
        userID: user._id,
        message: "Login successfull",
        filename: user.filename,
      });
    
  } catch (error) {
    console.log("error faced--------", error);
  }
};

const getUserprofile = async (req, res) => {
  console.log("Request received for user ID:", req.params.userID); // Log the incoming request
  try {
    const user = await Users.findById(req.params.userID).lean();
    console.log("User data fetched:", user); // Log the fetched user data

    const response = {
      active: true,
      User: user,
      Profile: user.filename,
      sellerstatus: user.sellerstatus,
      enotify: user.enotify,
      banstat: user.banned,
      req:user.req
    };
    console.log("Response to be sent:", response); // Log the response to be sent

    return res.status(200).json(response);
  } catch (error) {
    console.log("Error faced:", error); // Log any error that occurs
  }
};

const editUser = async (req, res) => {
  try {
    const { userID } = req.params;

    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).json({ message: "Empty fields" });
    }
    if (!email.match(mailformat && txt)) {
      return res.status(400).json({ message: "Enter a valid email" });
    }
    const data = await Users.findByIdAndUpdate(
      userID,
      { username, email },
      { new: "true" }
    );
    return res.status(200).json({ message: "successfully updated", data });
  } catch (error) {
    console.log("error", error);
  }
};
const editPic = async (req, res) => {
  try {
    const { userID } = req.params;

    const user = await Users.findById(userID);
    console.log("user", user);
    console.log("userfile", req.file);
    const callback = (error) => {
      if (error) {
        console.log("Unable to delete ", error);
      } else {
        console.log("Successfully deleted...");
      }
    };
    fs.unlink(`public/uploads/${user.filename}`, callback);
    console.log("req.file.filename", req.file.filename);
    const data = await Users.findByIdAndUpdate(
      userID,
      { filename: req.file.filename },
      { new: "true" }
    );
    return res.json({ message: "profile successfully updated", user: data });
  } catch (error) {
    console.log("error", error);
  }
};
const passConfirm = async (req, res) => {
  try {
    const { userID } = req.params;
    const { password } = req.body;
    if (!password) {
      return res.status(200).json({ message: "field is empty..." });
    }
    const user = await Users.findById(userID);
    const ispassvalid = await bcrypt.compare(password, user.password);

    if (!ispassvalid) {
      return res.status(200).json({ message: "Invalid password" });
    }
    return res.status(200).json({
      message: "successfull ! you can now provide a new password ",
      Status: true,
    });
  } catch (error) {
    return res.status(400).json({ message: "invalid Password" });
  }
};
const newPass = async (req, res) => {
  try {
    const { userID } = req.params;
    const { password, pmatch } = req.body;
    if (!password) {
      return res.status(400).json({ message: "field is empty..." });
    }
    if (!password.match(passformat)) {
      return res.status(400).json({
        message:
          " required : Minimum 8 characters,Maximum 20 characters,At least one uppercase character,At least one lowercase character,At least one digit,At least one special character ",
      });
    }
    if (!pmatch) {
      return res.status(400).json({ message: "Confirmation mandatory..." });
    }
    if (password !== pmatch) {
      return res.status(400).json({ message: "Password doesn't match..." });
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    const data = await Users.findByIdAndUpdate(userID, {
      password: hashedpassword,
    });
    return res.status(200).json({ message: "Successfully updated..." });
  } catch (error) {
    return res.status(400).json({ message: "Unable to Password" });
  }
};

//ADMIN FUNCTIONS
const deleteUsers = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await Users.findById(userID);
    const callback = (error) => {
      if (error) {
        console.log("Unable to delete ", error);
      } else {
        console.log("Successfully deleted...");
      }
    };
    fs.unlink(`public/uploads/${user.filename}`, callback);
    const response = await Users.findByIdAndDelete(userID);
    return res.status(200).json({ message: "Successfully removed" });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ message: "Unable to remove" });
  }
};
//User registering to become a seller
const sellerregister = async (req, res) => {
  try {
    const {
      userID,
      username,
      email,
      category,
      address,
      description,
      phno,
      pending,
      notify,
    } = req.body;
    console.log("dsjhg", req.body);

    if (
      !userID ||
      !username ||
      !email ||
      !category ||
      !address ||
      !description ||
      !phno
    ) {
      const callback = () => {
        console.log("Removed profile due to invalid registration credentials");
      };
      fs.unlink(`public/uploads/${req.file.filename}`, callback);
      return res.status(400).json({ message: "Empty fields" });
    }
    if (!req.file) {
      const callback = () => {
        console.log("Removed profile due to invalid registration credentials");
      };
      fs.unlink(`public/uploads/${req.file.filename}`, callback);
      return res.status(400).json({ message: "Please select a file" });
    }
    const users = await Seller.findOne({ username });
    if (users) {
      const callback = () => {
        console.log("Removed profile due to invalid registration credentials");
      };
      fs.unlink(`public/uploads/${req.file.filename}`, callback);
      return res.status(400).json({ message: "seller data already initiated" });
    }
    const user = await Users.findById(userID);
    console.log("user", user);
    if (!user) {
      const callback = () => {
        console.log("Removed profile due to invalid registration credentials");
      };
      fs.unlink(`public/uploads/${req.file.filename}`, callback);
      return res.status(400).json({ message: "un-authorized user " });
    }
    if (username !== user.username) {
      const callback = () => {
        console.log("Removed profile due to invalid registration credentials");
      };
      fs.unlink(`public/uploads/${req.file.filename}`, callback);
      return res.status(400).json({ message: "invalid Username" });
    }
    if (email !== user.email) {
      const callback = () => {
        console.log("Removed profile due to invalid registration credentials");
      };
      fs.unlink(`public/uploads/${req.file.filename}`, callback);
      return res.status(400).json({ message: "invalid email" });
    }
    console.log("filename", req.file.filename);
    const userrequpdate = await Users.findByIdAndUpdate(userID,{req:true})
    const data = new Seller({
      userID,
      username,
      email,
      category,
      address,
      description,
      phno: `+91 ${phno}`,
      filename: req.file.filename,
      pending,
      notify,
    });
    await data.save();
    return res.status(200).json({
      message:
        "successfully registered your request , waiting for admin confirmation",
      data,
    });
  } catch (error) {
    return res.status(400).json({ message: "Unable to request" });
  }
};
//ADMIN get the user seller data
const getsellerdata = async (req, res) => {
  try {
    const data = await Seller.find({ pending: true });
    console.log("data", data);
    res.status(200).send(data);
  } catch (error) {
    return res.status(400).json({ message: "Unable to fetch seller data" });
  }
};
//admin approves seller status and updating pending true to false
const updatesellerpending = async (req, res) => {
  try {
    const { id } = req.params;
    const { pending ,userID} = req.body;
    console.log("useridforchangingsellerstatusadmconfirm",userID)
    const data = await Seller.findByIdAndUpdate(id, { pending });
    const userupdate = await Users.findByIdAndUpdate(userID, {
      sellerstatus: true,
      req:false
    });
    console.log("data", data);
    res.status(200).json({
      message: "Seller request approved successfully",
      action: "approved",
    });
  } catch (error) {
    return res.status(400).json({ message: "An error occured" });
  }
};
//admin denies the seller request by deleting the seller form
const deletesellerpending = async (req, res) => {
  try {
    const { id } = req.params;
    const { filename,userID } = req.body;
    const data = await Seller.findByIdAndDelete(id);
    const user = await Users.findByIdAndUpdate(userID,{req:false})
    console.log("data", data);
    const callback = () => {
      console.log("Removed profile due to invalid registration credentials");
    };
    fs.unlink(`public/uploads/${filename}`, callback);
    res.status(200).json({ message: "Permission denied" });
  } catch (error) {
    return res.status(400).json({
      message: "Seller request denied successfully",
      action: "denied",
    });
  }
};
//admin updating error notification (e-notify) value to true
const updateenotify = async (req, res) => {
  try {
    const { userID } = req.params;
    const { enotify } = req.body;
    console.log("gfuufh", enotify);
    const data = await Users.findByIdAndUpdate(userID, { enotify });
    console.log("data", data);
    console.log("updated enotify");
  } catch (error) {
    console.log("unable to alter enotify", error);
  }
};
//user fetch user seller form data inorder for notification alert(success) by checking pending status
const  onlynotify = async (req, res) => {
  try {
    const { userID } = req.params;
    const seller = await Seller.findOne({ userID });
    if (!seller) {
      return console.log("not a seller");
    }

  return res.status(200).json({
   
    notify: seller.notify,
    pstat:seller.pending
    
  });
 
    
  } catch (error) {
    return res.status(400).json({ message: "Unable to fetch status" });
  }
};
const getsellerpendingstatus = async (req, res) => {
  try {
    const { userID } = req.params;
    const seller = await Seller.findOne({ userID });
    if (!seller) {
      return console.log("not a seller");
    }
    console.log("data", seller);

  return res.status(200).json({
    message: "request approved successfully you are now a seller",
    status: seller.pending,
    notify: seller.notify,
    seller,
  });

    
  } catch (error) {
    return res.status(400).json({ message: "Unable to fetch status" });
  }
};
const alternotify = async (req, res) => {
  try {
    const { notify } = req.body;
    const { userID } = req.params;
    const seller = await Seller.findOne({ userID });
    console.log("selleridmatchalternoti", seller);
    const update = await Seller.findByIdAndUpdate(seller._id, { notify });
   
    res
      .status(200)
      .json({ message: "Successfully changed notification status", update });
  } catch (error) {
    return res.status(400).json({ message: "Unable to alter" });
  }
};
const fetchLiked = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await Users.findById(userID);
    res.status(200).json({
      message: "Successfully changed notification status",
      likedlist: user.liked,
    });
  } catch (error) {
    return res.status(400).json({ message: "Unable to fetch" });
  }
};
const updatelike = async (req, res) => {
  try {
    const { userID } = req.params;
    const { itemid } = req.body;

    // Use updateOne instead of findOne
    await Users.updateOne({ _id: userID }, { $pull: { liked: itemid } });

    // Fetch the updated user after the update
    const user = await Users.findById(userID);

    res.status(200).json({
      message: "Successfully removed from wishlist",
      likedlist: user.liked,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Unable to remove" });
  }
};

const addtowishlist = async (req, res) => {
  try {
    const { userID } = req.params;

    const user = await Users.findById(userID);

    const product = await Products.findById(req.body.itemid);
    console.log("product", product);
    user.liked.push(product);
    await user.save();
    res.status(200).json({
      message: "successfully added to wishlist",
      savedidcart: user.liked,
    });
  } catch (error) {
    res.status(400).json({ message: "unable to add to wishlist", error });
  }
};
const getuserwishlist = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await Users.findById(userID);
    console.log("user", user);
    const product = await Products.find({
      _id: { $in: user.liked },
    });
    console.log("wishlist", user.liked);

    console.log("userproducts", product);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).json({ message: "Unable to fetch" });
  }
};

const updateban = async (req, res) => {
  try {
    const { userID } = req.params;
    const { banned } = req.body;
    const data = await Users.findByIdAndUpdate(userID, { banned });
    if (banned === true) {
      res.status(200).json({ message: "successfully banned", data });
    } else {
      res.status(200).json({ message: "successfully un-banned", data });
    }
  } catch (error) {
    console.log("unable to update ban status", error);
  }
};
const updatenotifyuser = async (req, res) => {
  try {
    const { userID } = req.params;
    const { enotify } = req.body;
    console.log("gfuufh", enotify);
    const data = await Users.findByIdAndUpdate(userID, { enotify });
    console.log("data", data);
    console.log("updated enotify");
  } catch (error) {
    console.log("unable to alter enotify", error);
  }
};
const getuserCartid = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await Users.findById(userID);
    const product = await Products.find({
      _id: { $in: user.cart },
    });
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(400).json({ message: "unable to add ", error });
  }
};
const getuserCartitem = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await Users.findById(userID).populate("cart.productID")
    // const product = await Products.find({
    //   _id: { $in: user.cart },
    // });
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(400).json({ message: "unable to add ", error });
  }
};
const addtoCart = async (req, res) => {
  try {
    const { userID } = req.params;
    const {id} = req.body
    const user = await Users.findByIdAndUpdate(
      userID,
      {
        $push: {
          cart: {
            productID: id, // Assuming `id` is the product ID you want to add
            quantity: 1,  // You can adjust the quantity as needed
          },
        },
      },
      { new: true } // To return the updated user document
    );

    res
      .status(200)
      .json({ message: "successfully added to cart"});
  } catch (error) {
    res.status(400).json({ message: "unable to add ", error });
  }
};
const removefromcart = async (req, res) => {
  try {
    const { userID } = req.params;
    const { id } = req.body;

    // Use updateOne instead of findOne
    await Users.updateOne({ _id: userID }, { $pull: { cart:{productID:id}  } });

    // Fetch the updated user after the update
    const user = await Users.findById(userID);

    res.status(200).json({
      message: "Successfully removed from cart",
      likedlist: user.liked,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Unable to remove" });
  }
};
const updatequantity = async (req, res) => {
  try {
    const { userID } = req.params;
    const {id,quantity} = req.body
  console.log("quantity",quantity)
const product = await Products.findById(id)
if(quantity>product.stoke)
{
  return  res.status(400).json({
    message: "Stoke limit exceeded"
    
  });
}

 const updated =  await Users.findByIdAndUpdate(
    userID,
    {
      $set: {
        "cart.$[item].quantity": quantity,
      },
    },
    {
      arrayFilters: [{ "item.productID": id }],
      new: true,
    }
  );


  res.status(200).json({
    message: "Successfully updated",
    quantity:updated,
  });
 }

 
 
 
   catch (error) {
   res.status(400).json({message:"unable to update"})
  }
};
const getbannedusers = async(req,res) =>{
  try{
  const data =[]
 const seller = await Users.find({banned:true})
 console.log("seller",typeof seller)
 seller.forEach((result)=>{
  data.push(result._id)
 })
 console.log("sellerid",data)
 res.status(200).json({bannedids:data})
  }
  catch(error){
    res.status(200).json({message:"Unable to fetch",error})
  }
}
module.exports = {
  registerUser,
  getUsers,
  loginuser,
  getUserprofile,
  editUser,
  editPic,
  passConfirm,
  newPass,
  deleteUsers,
  sellerregister,
  getsellerdata,
  updatesellerpending,
  deletesellerpending,
  getsellerpendingstatus,
  alternotify,
  fetchLiked,
  updatelike,
  addtowishlist,
  getuserwishlist,
  updateenotify,
  updatenotifyuser,
  updateban,
  addtoCart,
  getuserCartid,
  getuserCartitem,
  removefromcart,
  updatequantity,
  onlynotify,
  getbannedusers
};
