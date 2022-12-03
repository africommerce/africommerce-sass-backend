const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  product_owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product'
  },
  status : {
    type: String,
    enum: ['created', 'processing', 'dispatch', 'completed'],
    default: 'created'
  }
})

const orderModel = mongoose.model('Order', orderSchema)
module.exports = orderModel
