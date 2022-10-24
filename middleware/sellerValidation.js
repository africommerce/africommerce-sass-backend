const { body, validationResult } = require('express-validator')

function validateSeller() {
  return [
    body('firstname').notEmpty(),
    body('lastname').notEmpty(),
    body('username').notEmpty(),
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 6 }),
    body('address').notEmpty(),
    body('phonenumber').notEmpty(),
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
  validateSeller,
  validate,
}
