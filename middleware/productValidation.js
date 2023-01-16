const { body, validationResult } = require('express-validator')

function validateProduct() {
  return [
    body('name').notEmpty().isString(),
    body('brand').notEmpty().isString(),
    body('product_details').optional().isString(),
    body('category').notEmpty().isString(),
    body('quantity').notEmpty().isInt(),
    body('price').notEmpty().isFloat(),
    body('desc').notEmpty().isString(),
    body('warranty').optional().isString(),
    body('rating').optional().isInt({ max: 5, min: 1 }),
    body('images').notEmpty().isString(),
  ]
}

function validateOrder() {
  return [
    body('productId').notEmpty().isString(),
    body('quantity').notEmpty().isNumeric(),
  ]
}

function validate(req, res, next) {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  // const extractedErrors = []
  const { msg, param } = errors.array()[0]
  // .map((err) => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: `${param} ${msg}`,
  })
}

module.exports = {
  validateProduct,
  validateOrder,
  validate,
}
