const orderRouter = require('express').Router()

const { createOrder, getOrder } = require('./orderController')

const authenticate = require('../../middleware/authenticate')
const { paramIsValidId } = require('../../middleware/reqParamValidation')

orderRouter.route('/').all(authenticate.verifyUser).post(createOrder)

orderRouter.route('/:id').all(paramIsValidId).get(getOrder)

module.exports = orderRouter
