// //importing the mongoose database ORM
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Rating Schema
const ratingSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID required!"],
  },
  value: {
    type: Number,
    min: [1, "Rating is too low!"],
    max: [5, "Rating is too high!"],
    required: [true, 'Please provide rating value!']
  },
},
{timestamps: true}
);


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
    rating: [ratingSchema],
    images: {
      type: String,
      required: [true, "Please provide an image link!"],
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Product", ProductSchema);
module.exports = Products; //exporting the created model
