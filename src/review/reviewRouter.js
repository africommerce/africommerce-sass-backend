const reviewRouter = require('express').Router()
const authenticate = require('../../middleware/authenticate')


const {
  CreateReview,
  getReview,
  updateReview,
  deleteReview,
  getAllReview,
} = require('./ReviewController')

reviewRouter
  .route('/reviews')
  .post(authenticate.verifyUser, CreateReview)
  .get(getAllReview)

reviewRouter
  .route('/reviews/:id')
  .get(getReview)
  .put(authenticate.verifyUser, authenticate.verifyAuthor, updateReview)
  .delete(authenticate.verifyUser, authenticate.verifyAdmin, deleteReview)


module.exports = reviewRouter