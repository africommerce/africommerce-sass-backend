const Order = require('../../model/order')
const Product = require('../../model/products')

async function createOrder(req, res) {
  const user = req.user.id
  let { productId, quantity } = req.body
  const orderExist = await Order.findOne({ product: productId })
  if (orderExist) {
    return res.status(400).send({
      msg: 'This order exists already, try updating instead',
    })
  }
  const product = await Product.findOneAndUpdate(
    {
      _id: productId,
      quantity: { $gte: quantity },
    },
    { $inc: { quantity: -quantity } },
    { new: true }
  )
  if (!product) {
    return res.status(404).json({
      msg: 'This product does not exist or not enough stock',
    })
  }

  const price = product.price * quantity
  const newOrder = await Order.create({
    user,
    product: productId,
    quantity,
    price,
  })
  res.status(201).json({
    msg: 'order created!',
    newOrder: newOrder,
  })
}

async function getUserOrders(req, res) {
  const user = req.user.id
  const orders = await Order.find({ user }).populate('product').populate('user')
  if (orders.length === 0) {
    return res.json({
      msg: 'You do not have any order yet, you can create one!',
    })
  }
  res.json({ msg: 'Here are you orders' , orders })
}

async function getOrder(req, res) {
  const order = await Order.findById(req.params.id).populate('product')
  if (!order) {
    return res.status(404).json({
      msg: 'Order not found!',
    })
  }
  res.json({
    status: true,
    order,
  })
}

module.exports = {
  createOrder,
  getOrder,
  getUserOrders,
}
