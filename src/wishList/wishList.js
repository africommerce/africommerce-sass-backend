const express = require('express')

const WishListRoute = express.Router()
const authenticate = require('../../middleware/authenticate')
const { paramIsValidId } = require('../../middleware/reqParamValidation')
// const wishList = require('../../model/wishList')

// productRoute.use(passport.authenticate('jwt', { session: false }))

const {
  CreateWishList,
  getWishLists,
  deleteWishList,
} = require('./wishListController')

WishListRoute.route('/')
  .all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    next()
  }, authenticate.verifyUser)

  .post(CreateWishList)
  .get(getWishLists)

WishListRoute.route('/:id')
  .all(paramIsValidId)
  .delete(deleteWishList)

module.exports = WishListRoute
