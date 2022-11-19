const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: false,
    },
    owner_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const reviewModel = mongoose.model('Review', reviewSchema)
module.exports = reviewModel
