// //importing the mongoose database ORM
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  rating: {
    type: Number,
    min: [1],
    max: [5],
    required: [true, 'Please provide rating value!']
  },
  comment: {
      type: String,
      required: true
  },
  author:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }
},{
  timestamps: true
})


// Product Schema
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required!"],
    },
    brand_name: {
      type: String,
      required: [true, "Brand name is required!"],
    },
    product_details: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
      required: [true, "please provide product category!"],
    },
    quantity: {
      type: Number,
      required: [true, "product quantity required!"],
    },
    amount_sold:{
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, "product price is required!"],
    },
    desc: {
      type: String,
      required: [true, "product description is required!"],
    },
    warranty: {
      type: String,
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, 'Product owner Id required!']
    },
    reviews: [reviewSchema],
    images: {
      type: String,
      required: [true, "Please provide an image link!"],
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Product", ProductSchema);
module.exports = Products; //exporting the created model
