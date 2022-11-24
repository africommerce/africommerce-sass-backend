const express = require('express')

const productRoute = express.Router()
const authenticate = require('../../middleware/authenticate')

// productRoute.use(passport.authenticate('jwt', { session: false }))

const {
  createProduct,
  getProduct,
  getAllProducts,
  getAllProductsByRating,
  updateProduct,
  deleteProduct,
  TopProducts,
  latestProduct,
  bestSelling,
  bestSeller,
  fiveRandomProducts
} = require('./productController')


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

productRoute.route('/rating').get(getAllProductsByRating)
productRoute.route('/top-rated-product').get(TopProducts)
productRoute.route('/latest-products').get(latestProduct)
productRoute.route('/best-selling').get(bestSelling)

productRoute.route('/best-sellers').get(bestSeller)



productRoute
  .route('/five-products')
  .get(fiveRandomProducts)


productRoute
  .route('/:id')
  .put(updateProduct)
  .get(getProduct)
  .delete(deleteProduct)
module.exports = productRoute
