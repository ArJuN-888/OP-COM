const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  stoke: { type: Number, required: true },
  category: { type: String, required: true },
  brandname: { type: String, required: true },
  productname: { type: String, required: true },
  description: { type: String, required: true },
  photourl: { type: String, required: true },
  loginid: { type: mongoose.Schema.Types.ObjectId, required: true },
  price: { type: Number, required: true },
  prevprice: { type: Number, required: true },
  genderprefer: { type: String, required: true },
  strapcolor: { type: String }, // No longer marked as required
  body: { type: String }, // No longer marked as required
  material: { type: String }, // No longer marked as required
  capacity: { type: String } // No longer marked as required
});

const Products = mongoose.model("Product", ProductSchema);

module.exports = {
  Products
};
