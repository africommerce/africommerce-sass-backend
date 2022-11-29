const express = require('express')
<<<<<<< HEAD
const authenticate = require('../../middleware/authenticate')
=======
const { paramIsValidId } = require('../../middleware/reqParamValidation')
>>>>>>> 584e2588a411e016c04bd473a7111cb21cf1caf5

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
>>>>>>> 584e2588a411e016c04bd473a7111cb21cf1caf5

module.exports = brandRoute