const orderRouter = require('express').Router()

const { createOrder, getOrder } = require('./orderController')

const authenticate = require('../../middleware/authenticate')
const { paramIsValidId } = require('../../middleware/reqParamValidation')
const { validateOrder, validate } = require('../../middleware/productValidation')

orderRouter
  .route('/')
  .all(authenticate.verifyUser, validateOrder(), validate)
  .post(createOrder)

orderRouter.route('/:id').all(paramIsValidId).get(getOrder)

module.exports = orderRouter
