// //importing the mongoose database ORM
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// //create the model

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required!"],
    },
    brand_name: {
      type: String,
      required: [true, "brand name is required!"],
    },
    product_details: {
      type: String,
    },
    category: {
      type: String,
      required: [true, "please provide product category!"],
    },
    quantity: {
      type: Number,
      required: [true, "product quantity required!"],
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
    },
    rating: {
      type: Number,
      min: [1, "Rating is too low!"],
      max: [5, "Rating is high!"],
    },
    images: {
      type: String,
      required: [true, "Please provide an image link!"],
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Product", ProductSchema);
module.exports = Products; //exporting the created model
