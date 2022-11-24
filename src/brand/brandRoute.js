const express = require('express')
const authenticate = require('../../middleware/authenticate')

const brandController = require('./brandController')
const brandRoute = express.Router()

brandRoute
  .route('/')
  .get(brandController.getAllBrand)
  .post(authenticate.verifyUser, authenticate.verifyAdmin, brandController.createBrand)

brandRoute
  .route('/:id')
  .put(authenticate.verifyUser, authenticate.verifyAdmin, brandController.updateBrand)
  .delete(authenticate.verifyUser, authenticate.verifyAdmin, brandController.deleteBrand)

module.exports = brandRoute