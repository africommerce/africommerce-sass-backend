const express = require('express')

const categoryController = require('./categoryController')
const categoryRoute = express.Router()

categoryRoute
  .route('/five-random-categories')
  .get(categoryController.fiveRandomCategories)

categoryRoute
  .route('/random-categories')
  .get(categoryController.sixRandomCategories)

categoryRoute
  .route('/')
  .post(categoryController.createCategory)
  .get(categoryController.getAllCategories)

module.exports = categoryRoute
