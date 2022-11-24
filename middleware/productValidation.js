const { body, validationResult } = require('express-validator')

function validateProduct() {
  return [
    body('name').notEmpty().isString(),
    body('brand').notEmpty().isString(),
    body('product_details').optional().isString(),
    body('category').notEmpty().isString(),
    body('quantity').notEmpty().isInt(),
    body('price').notEmpty().isInt(),
    body('desc').notEmpty().isString(),
    body('warranty').optional().isString(),
    body('rating').optional().isInt({ max: 5, min: 1 }),
    body('images').notEmpty().isString(),
  ]
}

function validate(req, res, next) {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  validateProduct,
  validate,
}
