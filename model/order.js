const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    status: {
      type: String,
      enum: ['created', 'processing', 'dispatched', 'completed'],
      default: 'created',
    },
  },
  { timestamps: true }
)

orderSchema.index({ user: 1 })

module.exports = mongoose.model('Order', orderSchema)
