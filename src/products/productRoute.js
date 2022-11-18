const express = require('express')

const productRoute = express.Router()
const authenticate = require('../../middleware/authenticate')

// productRoute.use(passport.authenticate('jwt', { session: false }))

const {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  TopProducts,
  latestProduct,
  bestSelling,
  bestSeller,
} = require('./productController')

const {
  CreateReview,
  getReviews,
  updateReview,
  deleteReview,
} = require('./ReviewController')

const {
  validateProduct,
  validate,
} = require('../../middleware/productValidation')

productRoute
  .route('/')
  .all((req, res, next) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    next()
  })
  .post(
    authenticate.verifyUser,
    authenticate.verifyUserType,
    validateProduct(),
    validate,
    createProduct
  )
  .get(getAllProducts)

productRoute.route('/top-rated-product').get(TopProducts)
productRoute.route('/latest-products').get(latestProduct)
productRoute.route('/best-selling').get(bestSelling)

productRoute.route('/best-sellers').get(bestSeller)

productRoute
  .route('/:id')
  .put(updateProduct)
  .get(getProduct)
  .delete(deleteProduct)

productRoute
  .route('/:id/reviews')
  .get(getReviews)
  .get(authenticate.verifyUser, CreateReview)

productRoute
  .route('/:id/reviews/:reviewID')
  .put(authenticate.verifyUser, authenticate.verifyAuthor, updateReview)
  .delete(authenticate.verifyUser, authenticate.verifyAdmin, deleteReview)

module.exports = productRoute
