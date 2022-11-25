const express = require('express')
<<<<<<< HEAD
const authenticate = require('../../middleware/authenticate')
=======
const { paramIsValidId } = require('../../middleware/reqParamValidation')
>>>>>>> 51c1fe2b7dd5cdfa27f1a1eb8236cd29bfd7f1af

const brandController = require('./brandController')
const brandRoute = express.Router()

brandRoute
  .route('/')
  .get(brandController.getAllBrand)
  .post(authenticate.verifyUser, authenticate.verifyAdmin, brandController.createBrand)

brandRoute
  .route('/:id')
<<<<<<< HEAD
  .put(authenticate.verifyUser, authenticate.verifyAdmin, brandController.updateBrand)
  .delete(authenticate.verifyUser, authenticate.verifyAdmin, brandController.deleteBrand)
=======
  .put(paramIsValidId, brandController.updateBrand)
  .delete(paramIsValidId, brandController.deleteBrand)
>>>>>>> 51c1fe2b7dd5cdfa27f1a1eb8236cd29bfd7f1af

module.exports = brandRoute