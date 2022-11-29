const express = require('express')
const { paramIsValidId } = require('../../middleware/reqParamValidation')

const brandController = require('./brandController')
const brandRoute = express.Router()

brandRoute
  .route('/')
  .get(brandController.getAllBrand)
  .post(brandController.createBrand)

brandRoute
  .route('/:id')
  .put(paramIsValidId, brandController.updateBrand)
  .delete(paramIsValidId, brandController.deleteBrand)

module.exports = brandRoute