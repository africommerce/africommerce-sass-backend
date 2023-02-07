const express = require('express')
const productRoute = require('../src/products/productRoute')
const userRoute = require('../src/users/users')
const businessRouter = require('../src/business/buisnessRouter')
const categoryRoute = require('../src/categories/categoryRoute')
const brandRoute = require('../src/brand/brandRoute')
const reviewRouter = require('../src/review/reviewRouter')
const wishlistRouter = require('../src/wishList/wishList')
const orderRouter = require('../src/order/orderRouter')

// const passport = require('passport')

const rootRouter = express.Router()

/* GET home page. */
rootRouter.get('/', function (req, res) {
  res.render('index', { title: 'Express' })
})

rootRouter.use('/users', userRoute)
rootRouter.use('/products', productRoute)
rootRouter.use('/business', businessRouter)
rootRouter.use('/categories', categoryRoute)
rootRouter.use('/brands', brandRoute)
rootRouter.use('/reviews', reviewRouter)
rootRouter.use('/wishlist', wishlistRouter)
rootRouter.use('/orders', orderRouter)

module.exports = rootRouter
