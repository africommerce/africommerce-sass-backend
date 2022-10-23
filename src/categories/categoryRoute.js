const express = require('express')

const categoryController = require('./categoryController')
const categoryRoute = express.Router()

categoryRoute
    .route('/')
    .post(categoryController.createCategory)
    .get(categoryController.getAllCategories)


module.exports=categoryRoute