const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wishListSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
)

const WishListModel = mongoose.model('wishList', wishListSchema)
module.exports = WishListModel
