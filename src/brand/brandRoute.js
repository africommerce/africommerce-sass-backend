const express = require('express')

const brandController = require('./brandController')
const brandRoute = express.Router()

brandRoute
  .route('/')
  .get(brandController.getAllBrand)
  .post(brandController.createBrand)

brandRoute
  .route('/:id')
  .put(brandController.updateBrand)
  .delete(brandController.deleteBrand)

module.exports = brandRoute