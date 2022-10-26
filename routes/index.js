const express = require('express');
const productRoute = require("../src/products/productRoute");
const userRoute = require("../src/users/users")
const categoryRoute = require("../src/categories/categoryRoute");
const wishlistRoute = require("../src/wishlist/wishListRoute")

const passport = require('passport')


const rootRouter = express.Router();


/* GET home page. */
rootRouter.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

rootRouter.use('/users', userRoute);
rootRouter.use('/products', productRoute)
rootRouter.use('/category', categoryRoute)
rootRouter.use('/wishlist', wishlistRoute)



module.exports = rootRouter;
