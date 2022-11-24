const reviewRoute = require('express').Router()
const authenticate = require('../../middleware/authenticate')


const {
  CreateReview,
  getReview,
  updateReview,
  deleteReview,
  getAllReview,
} = require('./ReviewController')

reviewRoute
  .route('/reviews')
  .post(authenticate.verifyUser, CreateReview)
  .get(getAllReview)

reviewRoute
  .route('/reviews/:id')
  .get(getReview)
  .put(authenticate.verifyUser, authenticate.verifyAuthor, updateReview)
  .delete(authenticate.verifyUser, authenticate.verifyAdmin, deleteReview)
