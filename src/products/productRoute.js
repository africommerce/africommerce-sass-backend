const express = require("express");

const productRoute = express.Router();
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
    productById,
    getRelatedProducts
} = require("./productController")

const { validateProduct, validate } = require("../../middleware/productValidation")

productRoute.route("/")
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json")
        next()
    })

    .post(authenticate.verifyUser, authenticate.verifyUserType, validateProduct(), validate, createProduct)
    .get(getAllProducts)


productRoute
    .route("/top-rated-product")
    .get(TopProducts);
productRoute
    .route("/latest-products")
    .get(latestProduct)


productRoute.route('/:id')
    .put(updateProduct)
    .get(getProduct)

productRoute.route("/related/:productId")
    .get(getRelatedProducts)

productRoute.param("productId", productById);

module.exports = productRoute;