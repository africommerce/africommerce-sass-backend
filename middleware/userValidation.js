const { body, validationResult } = require('express-validator')

function validateUser() {
  return [
    // username must be an email
    body('firstname').notEmpty().withMessage('Firstname is required!'),
    body('lastname').notEmpty().withMessage('Lastname is required!'),
    body('username').notEmpty().withMessage('username is required!'),
    body('email').isEmail().withMessage('Invalid email!'),
    // password must be at least 5 chars long
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must have minmum of 6 characters!'),
    body('phonenumber').notEmpty().withMessage('Phone number is required!'),
    body('phonenumber').matches(/^(0|\+\d{1,3}0?)\d{10}$/).withMessage('Please fill a valid phone number.')
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
  validateUser,
  validate,
}
