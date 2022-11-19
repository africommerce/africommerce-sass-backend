const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Product Schema
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required!'],
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: 'Brand',
    },
    product_details: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
      required: [true, 'please provide product category!'],
    },
    quantity: {
      type: Number,
      required: [true, 'product quantity required!'],
    },
    amount_sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'product price is required!'],
    },
    desc: {
      type: String,
      required: [true, 'product description is required!'],
    },
    warranty: {
      type: String,
    },
    refundable: {
      type: Boolean,
      default: true,
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Product owner Id required!'],
    },
    rating: {
      type: Number,
      default: 0
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Review',
      },
    ],
    images: {
      type: String,
      required: [true, 'Please provide an image link!'],
    },
  },
  { timestamps: true }
)
const Products = mongoose.model('Product', ProductSchema)

module.exports = Products
