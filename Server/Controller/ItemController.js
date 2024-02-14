const { Products } = require("../Model/ProductSchema");
const { Users } = require("../Model/UserSchema");
const { Admin } = require("../Model/AdminSchema");
const adduserProduct = async (req, res) => {
  try {
    const {
      stoke,
      category,
      brandname,
      productname,
      description,
      photourl,
      loginid,
      price,
    } = req.body;
    if (
      !productname ||
      !category ||
      !brandname ||
      !description ||
      !photourl ||
      !price 

    ) {
      return res.status(400).json({ message: "Please fill the fields" });
    }
    if (!loginid) {
      return res.status(400).json({ message: "Login required" });
    }
    console.log("reqbody", req.body);
    const data = new Products({
      stoke,
      category,
      brandname,
      productname,
      description,
      photourl,
      loginid,
      price,
    });
    await data.save();
    return res.status(200).json({ message: "Successfully added", data });
  } catch (error) {
    res.status(400).json({ message: "Unable to add" });
  }
};
//Home
const getProduct = async (req, res) => {
  try {
    const {userID} = req.params
    const users = await Users.find({ banned: false }).lean();
    const currentuser = await Users.findById(userID)
   console.log("current",currentuser)
    const admin = await Admin.find({});
   
    console.log("users", users);
if(currentuser.sellerstatus===true)//checking for current user is a seller or not (seller condition)
{
  let data = [];
  let tempdata =[]
let userProducts = [];
  for ( i = 0; i < users.length; i++) {
   userProducts = await Products.find({ loginid: users[i]._id });
   tempdata = [...tempdata, ...userProducts];
  }
  console.log("tempdataalluser",tempdata)
    const removesellerpro = tempdata.filter(product =>String(product.loginid)  !== String(currentuser._id));
    console.log("removesellerpro",removesellerpro)
    data = [...data, ...removesellerpro];
 

  const adminProducts = await Products.find({ loginid: admin[0]._id });
  data = [...data, ...adminProducts];

  return res.status(200).json({products:data});
}
    let data = [];

    for (let i = 0; i < users.length; i++) {
      const userProducts = await Products.find({ loginid: users[i]._id  });//getting seller products (user logged condition)
      data = [...data, ...userProducts];
    }

    const adminProducts = await Products.find({ loginid: admin[0]._id });
    data = [...data, ...adminProducts];

    return res.status(200).json({products:data});
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Unable to fetch" });
  }
};

const getuserProduct = async (req, res) => {
  try {
    const { userID } = req.params;
    const user = await Users.findById(userID).lean();
    const product = await Products.find({
      loginid: { $in: user._id },
    });

    console.log("userproducts", product);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).json({ message: "Unable to fetch" });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByIdAndDelete(id);
    await Users.updateMany(
      {
        $or: [
          { 'cart.productID': id },
          { liked: id },
        ],
      },
      {
        $pull: { cart: { productID: id }, liked: id },
      }
    );
    console.log("userproducts", product);
    res.status(200).json({ message: "successfully deleted", product });
  } catch (error) {
    res.status(400).json({ message: "Unable to delete" });
  }
};
const deleteadminProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByIdAndDelete(id);
    await Users.updateMany(
      {
        $or: [
          { 'cart.productID': id },
          { liked: id },
        ],
      },
      {
        $pull: { cart: { productID: id }, liked: id },
      }
    );
    console.log("userproducts", product);
    res.status(200).json({ message: "successfully deleted", product });
  } catch (error) {
    res.status(400).json({ message: "Unable to delete" });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { ids } = req.params;
    const {
      stoke,
      category,
      brandname,
      productname,
      description,
      photourl,
      price,
    } = req.body;
    if(!stoke || !category || !brandname || !productname || !description || !photourl || !price)
    {
return res.status(400).json({ message: "empty-fields unable to proceed"});
    }
    const product = await Products.findByIdAndUpdate(ids, {
      stoke,
      category,
      brandname,
      productname,
      description,
      photourl,
      price,
    });
    console.log("userproducts", product);
    return res.status(200).json({ message: "successfully updated", product });
  } catch (error) {
    res.status(400).json({ message: "Unable to update" });
  }
};


const getadminProduct = async (req, res) => {
  try {
    const { adminID } = req.params;
    const admin = await Admin.findById(adminID);
    console.log("admin", admin);
    const product = await Products.find({
      loginid: { $in: admin._id },
    });

    console.log("userproducts", product);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).json({ message: "Unable to fetch" });
  }
};
const addadminProduct = async (req, res) => {
  try {
    const {
      stoke,
      category,
      brandname,
      productname,
      description,
      photourl,
      loginid,
      price,
    } = req.body;
    if (!productname || !category || !description || !photourl || !price) {
      return res.status(400).json({ message: "Please fill the fields" });
    }
    if (!loginid) {
      return res.status(400).json({ message: "Login required" });
    }
    console.log("reqbody", req.body);
    const data = new Products({
      stoke,
      category,
      brandname,
      productname,
      description,
      photourl,
      loginid,
      price,
    });
    await data.save();
    return res.status(200).json({ message: "Successfully added", data });
  } catch (error) {
    res.status(400).json({ message: "Unable to add" });
  }
};
const productDetails = async(req,res) =>{
  try{
    const {productId} = req.params
    const product = await Products.findById(productId);
    console.log("productsdetails",product)
    res.status(200).send(product)
  }
catch(error)
{
  console.log("Unable to fetch details")
}
}

module.exports = {
  adduserProduct,
  getProduct,
  getuserProduct,
  deleteProduct,
  deleteadminProduct,
  updateProduct,
  getadminProduct,
  addadminProduct,
  productDetails
};
