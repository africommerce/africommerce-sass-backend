const reviewRouter = require('express').Router()
const authenticate = require('../../middleware/authenticate')
const { paramIsValidId } = require('../../middleware/reqParamValidation')


const {
  CreateReview,
  getReview,
  updateReview,
  deleteReview,
  getAllReview,
} = require('./ReviewController')

reviewRouter
  .route('/')
  .post(authenticate.verifyUser, CreateReview)
  .get(getAllReview)

reviewRouter
  .route('/:id')
  .get(paramIsValidId, getReview)
  .put(paramIsValidId, authenticate.verifyUser, authenticate.verifyAuthor, updateReview)
  .delete(paramIsValidId, authenticate.verifyUser, authenticate.verifyAdmin, deleteReview)


module.exports = reviewRouter