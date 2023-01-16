const orderRouter = require('express').Router()

const { createOrder, getOrder, getUserOrders } = require('./orderController')

const authenticate = require('../../middleware/authenticate')
const { paramIsValidId } = require('../../middleware/reqParamValidation')
const {
  validateOrder,
  validate,
} = require('../../middleware/productValidation')

orderRouter
  .route('/')
  .post(authenticate.verifyUser, validateOrder(), validate, createOrder)

orderRouter.route('/user').all(authenticate.verifyUser).get(getUserOrders)

orderRouter.route('/:id').all(paramIsValidId).get(getOrder)

module.exports = orderRouter
