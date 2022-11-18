const express = require('express')
const router = express.Router()
// const passport = require('passport')
const authenticate = require('../../middleware/authenticate')
const {
  createUser,
  updateUserById,
  deleteUserById,
  getAllUser,
  getOneUser,
  loginUser,
  logoutUser,
  getSellers,
  getSellerById,
  updateUserPassword,
} = require('./userController')
const { validateUser, validate } = require('../../middleware/userValidation')


/* GET users listing. */
router
  .route('/')
  .get(getAllUser)

router
  .route('/signup')
  .post(validateUser(), validate, createUser)

router
  .route('/loginuser')
  .post(loginUser)

router
  .route('/logout')
  .get(authenticate.verifyUser, logoutUser)

router
  .route('/sellers')
  .get(getSellers)


router
  .route('/sellers/:id')
  .get(getSellerById)

router
  .route('/update_password')
  .put(authenticate.verifyUser, updateUserPassword)

router
  .route('/:id')
  .put(updateUserById)
  .get(getOneUser)
  .delete(deleteUserById)

module.exports = router
