const router = require('express').Router()
const { createSeller } = require("./sellerController")
const { validateSeller, validate } = require("../../middleware/sellerValidation")

/**
 * @POST to host/sellers/signup
 * creates a new seller
 */
router
  .route('/signup')
  .post(validateSeller(), validate, createSeller)

module.exports = router
