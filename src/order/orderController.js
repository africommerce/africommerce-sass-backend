const Order = require('../../model/order')
const Product = require('../../model/products')

async function createOrder(req, res) {
  const user = req.user.id
  const product = req.body.product
  let product_owner = await Product.findById(product)
  if (!product) {
    return res.status(404).json({
      msg: 'product to order not found!',
    })
  }
  product_owner = await product_owner.populate('owner_id', 'id')
  if (!product_owner) {
    return res.status(404).json({
      msg: 'Product not found!',
    })
  }

  const newOrder = new Order({
    user,
    product,
    product_owner,
  })
  await newOrder.save()
  res.status(201).json({
    msg: 'order created!',
    newOrder,
  })
}

async function getOrder(req, res) {
  const order = await Order.findById(req.params.id)
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
  getOrder
}
