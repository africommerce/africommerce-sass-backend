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
    productById,
    getRelatedProducts,
} = require("./productController")

const { validateProduct, validate } = require("../../middleware/productValidation")

productRoute.route("/")
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json")
        next()
    })

    .post(validateProduct(), validate, createProduct)
    .get(authenticate.verifyUser, getAllProducts)
    

productRoute
    .route("/top-Rated-Product")
    .get(TopProducts);


productRoute.route('/:id')
    .put(updateProduct)
    .get(getProduct)

productRoute.route("/related/:id")
    .get(getRelatedProducts)

productRoute.param("id", productById);

module.exports = productRoute;