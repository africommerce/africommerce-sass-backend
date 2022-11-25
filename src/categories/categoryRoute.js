const express = require('express')

const categoryController = require('./categoryController')
const categoryRoute = express.Router()

categoryRoute
  .route('/five-random-categories')
  .get(categoryController.fiveRandomCategories)

categoryRoute
  .route('/')
  .post(categoryController.createCategory)
  .get(categoryController.getAllCategories)

categoryRoute
  .route('/five-category-products')
  .get(categoryController.fiveCategoriesAndProduct)

module.exports = categoryRoute
